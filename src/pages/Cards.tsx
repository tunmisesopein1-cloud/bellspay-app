import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Eye, EyeOff, Copy, Lock, Unlock } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Cards = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [isCardLocked, setIsCardLocked] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const cardNumber = "5399 **** **** 7823";
  const fullCardNumber = "5399 8234 5678 7823";
  const expiryDate = "12/27";
  const cvv = "***";

  const copyCardNumber = () => {
    navigator.clipboard.writeText(fullCardNumber.replace(/\s/g, ""));
    toast({
      title: "Copied!",
      description: "Card number copied to clipboard"
    });
  };

  const toggleCardLock = () => {
    setIsCardLocked(!isCardLocked);
    toast({
      title: isCardLocked ? "Card Unlocked" : "Card Locked",
      description: isCardLocked 
        ? "Your card is now active for transactions" 
        : "Your card is now locked. No transactions can be made."
    });
  };

  return (
    <>
      <Helmet>
        <title>My Cards - Bells Bank</title>
        <meta name="description" content="Manage your Bells Bank virtual and physical cards." />
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

          <div>
            <h2 className="text-2xl font-bold text-foreground">My Cards</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your virtual debit card</p>
          </div>

          {/* Virtual Card */}
          <div className="relative">
            <div className={`rounded-2xl p-6 bg-gradient-to-br from-primary via-primary/90 to-secondary aspect-[1.6/1] max-w-md mx-auto shadow-lg ${isCardLocked ? "opacity-60" : ""}`}>
              <div className="flex flex-col justify-between h-full text-primary-foreground">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-80">Virtual Card</p>
                    <p className="font-bold text-lg">Bells Bank</p>
                  </div>
                  <CreditCard className="h-8 w-8" />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Card Number</p>
                    <p className="font-mono text-lg tracking-wider">
                      {showCardNumber ? fullCardNumber : cardNumber}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80">Card Holder</p>
                      <p className="font-medium">{profile?.full_name?.toUpperCase() || "CARD HOLDER"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-80">Expires</p>
                      <p className="font-medium">{expiryDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-80">CVV</p>
                      <p className="font-medium">{cvv}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isCardLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl">
                  <Lock className="h-12 w-12 text-destructive" />
                </div>
              )}
            </div>
          </div>

          {/* Card Actions */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Card Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={() => setShowCardNumber(!showCardNumber)}
              >
                {showCardNumber ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="text-xs">{showCardNumber ? "Hide Details" : "Show Details"}</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4"
                onClick={copyCardNumber}
              >
                <Copy className="h-5 w-5" />
                <span className="text-xs">Copy Number</span>
              </Button>

              <Button
                variant={isCardLocked ? "gold" : "outline"}
                className="flex flex-col items-center gap-2 h-auto py-4 col-span-2"
                onClick={toggleCardLock}
              >
                {isCardLocked ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                <span className="text-xs">{isCardLocked ? "Unlock Card" : "Lock Card"}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Card Limits */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Daily Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Online Transactions</span>
                <span className="font-medium text-foreground">₦500,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">ATM Withdrawal</span>
                <span className="font-medium text-foreground">₦100,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">POS Transactions</span>
                <span className="font-medium text-foreground">₦300,000</span>
              </div>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Cards;
