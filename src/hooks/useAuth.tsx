import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
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
  };

  useEffect(() => {
    setLoading(true);

    // Prevent refresh-token stampedes by taking control of refresh scheduling.
    // Supabase rotates refresh tokens; concurrent refreshes (e.g., tab wakeups) can revoke tokens and log users out.
    supabase.auth.stopAutoRefresh();

    let refreshTimer: number | undefined;
    let refreshing = false;

    const safeRefreshSession = async () => {
      if (refreshing) return;
      refreshing = true;
      try {
        // refreshSession updates the stored session (and will emit auth events)
        await supabase.auth.refreshSession();
      } catch {
        // Intentionally swallow refresh errors here; a transient 429/network issue
        // shouldn't immediately kick the user back to /auth.
      } finally {
        refreshing = false;
      }
    };

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Defer profile fetch with setTimeout to avoid deadlock
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
      }

      // Note: don't flip `loading` here. INITIAL_SESSION can fire before getSession()
      // resolves, which would make protected routes briefly see `session=null` and
      // bounce users back to /auth.
      if (event === 'SIGNED_OUT') {
        setInitialized(true);
        setLoading(false);
      }
    });

    // THEN check for existing session (this is our "auth is ready" signal)
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }

        setInitialized(true);
        setLoading(false);

        // Refresh a bit before expiry (session is 60m by default). Keep it simple.
        refreshTimer = window.setInterval(() => {
          safeRefreshSession();
        }, 50 * 60 * 1000);
      })
      .catch(() => {
        // If getSession fails for any reason, allow app to render and routes to decide.
        setInitialized(true);
        setLoading(false);
      });

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        safeRefreshSession();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (refreshTimer) window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      subscription.unsubscribe();
      // Resume default behavior if other parts of the app rely on it.
      supabase.auth.startAutoRefresh();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    metadata: { full_name: string; matric_number: string; phone_number: string }
  ) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut }}>
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
