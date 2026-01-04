import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, Mail, Phone, CreditCard, Save } from "lucide-react";
import { Helmet } from "react-helmet";
import bellsUniversity from "@/assets/bells-university.webp";

const Profile = () => {
  const { session, user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      navigate("/auth");
    }
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <>
      <Helmet>
        <title>Profile - Bells Bank</title>
        <meta name="description" content="View and manage your Bells Bank profile settings." />
      </Helmet>

      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <Header />

        <main className="container py-6 space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Profile Header with Background */}
          <Card className="border-border/50 overflow-hidden">
            {/* Background Image */}
            <div className="relative h-32 w-full">
              <img 
                src={bellsUniversity} 
                alt="Bells University" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
            </div>
            <CardContent className="relative -mt-12 pb-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-secondary bg-card">
                  <AvatarFallback className="bg-secondary/20 text-secondary text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">{profile?.full_name || "User"}</h2>
                  <p className="text-muted-foreground">{profile?.matric_number}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Profile Information</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" /> Full Name
                </Label>
                {isEditing ? (
                  <Input defaultValue={profile?.full_name || ""} />
                ) : (
                  <p className="text-foreground font-medium">{profile?.full_name || "Not set"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <p className="text-foreground font-medium">{profile?.email || user?.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="h-4 w-4" /> Matric Number
                </Label>
                <p className="text-foreground font-medium">{profile?.matric_number || "Not set"}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> Phone Number
                </Label>
                {isEditing ? (
                  <Input defaultValue={profile?.phone_number || ""} />
                ) : (
                  <p className="text-foreground font-medium">{profile?.phone_number || "Not set"}</p>
                )}
              </div>

              {isEditing && (
                <Button variant="gold" className="w-full flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Account Balance Card */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Account Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gradient-gold">
                ₦{(profile?.account_balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Profile;
