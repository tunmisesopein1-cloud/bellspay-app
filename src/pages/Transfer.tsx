import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, User, Banknote } from "lucide-react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Transfer = () => {
  const { session, user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient.trim()) {
      toast({
        title: "Error",
        description: "Please enter a recipient matric number or phone number",
        variant: "destructive"
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    if (transferAmount > (profile?.account_balance || 0)) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds for this transfer",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate transfer processing
    setTimeout(() => {
      toast({
        title: "Transfer Successful!",
        description: `₦${transferAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} sent to ${recipient}`
      });
      setRecipient("");
      setAmount("");
      setDescription("");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Send Money - Bells Bank</title>
        <meta name="description" content="Send money to other Bells Bank users quickly and securely." />
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
            <h2 className="text-2xl font-bold text-foreground">Send Money</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Transfer funds to other Bells Bank users
            </p>
          </div>

          {/* Balance Card */}
          <Card className="border-border/50 bg-gradient-to-br from-primary to-primary/80">
            <CardContent className="pt-6">
              <p className="text-primary-foreground/80 text-sm">Available Balance</p>
              <p className="text-3xl font-bold text-primary-foreground mt-1">
                ₦{(profile?.account_balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Send className="h-5 w-5 text-secondary" />
                Transfer Details
              </CardTitle>
              <CardDescription>Enter the recipient's details and amount</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Recipient (Matric No. or Phone)
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="Enter matric number or phone number"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" /> Amount (₦)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="What's this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Send Money"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Transfer;
