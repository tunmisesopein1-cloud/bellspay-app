import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  matric_number: string;
  phone_number: string | null;
  account_balance: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: { full_name: string; matric_number: string; phone_number: string }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Track if we're in an auth operation to prevent premature loading=false
  const authOperationRef = useRef(false);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    setProfile(data);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  // Avoid double-initialization in dev (React.StrictMode mounts/effects twice).
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    setLoading(true);

    // Listen FIRST so we never miss a sign-in/sign-out event.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      // Update session and user state synchronously
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      // Never call other supabase functions directly in this callback.
      if (nextSession?.user) {
        setTimeout(() => fetchProfile(nextSession.user.id), 0);
      } else {
        setProfile(null);
      }

      // Only set loading to false if we're not in an auth operation
      // This prevents race conditions during signIn/signUp
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (!authOperationRef.current) {
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setLoading(false);
      }
    });

    // Then initialize from persisted session (localStorage).
    supabase.auth.getSession()
      .then(({ data }) => {
        const existingSession = data.session;
        setSession(existingSession);
        setUser(existingSession?.user ?? null);
        
        if (existingSession?.user) {
          fetchProfile(existingSession.user.id);
        }
      })
      .catch(() => {
        // If init fails, we still let routes decide; user can log in again.
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = async (
    email: string,
    password: string,
    metadata: { full_name: string; matric_number: string; phone_number: string }
  ) => {
    authOperationRef.current = true;
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata,
        },
      });

      if (!error && data.session) {
        // Immediately set the session from the response
        setSession(data.session);
        setUser(data.session.user);
        
        // Fetch profile in background
        if (data.session.user) {
          fetchProfile(data.session.user.id);
        }
      }

      return { error };
    } finally {
      authOperationRef.current = false;
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    authOperationRef.current = true;
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.session) {
        // Immediately set the session from the response
        setSession(data.session);
        setUser(data.session.user);
        
        // Fetch profile in background
        if (data.session.user) {
          fetchProfile(data.session.user.id);
        }
      }

      return { error };
    } finally {
      authOperationRef.current = false;
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setProfile(null);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

