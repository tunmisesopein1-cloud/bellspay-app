import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, ShoppingBag, Wifi, Zap } from "lucide-react";
import { Helmet } from "react-helmet";

const transactions = [
  {
    id: 1,
    type: "received",
    name: "Transfer from John",
    description: "Monthly allowance",
    amount: 50000,
    date: "Today, 2:30 PM",
    icon: ArrowDownLeft,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    id: 2,
    type: "sent",
    name: "POS Payment",
    description: "Chicken Republic",
    amount: -3500,
    date: "Today, 11:45 AM",
    icon: ShoppingBag,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    type: "sent",
    name: "Airtime Purchase",
    description: "MTN ₦1,000",
    amount: -1000,
    date: "Yesterday, 6:20 PM",
    icon: Wifi,
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    id: 4,
    type: "sent",
    name: "Electricity Bill",
    description: "IKEDC Prepaid",
    amount: -5000,
    date: "Yesterday, 3:15 PM",
    icon: Zap,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: 5,
    type: "received",
    name: "Refund",
    description: "Online Purchase",
    amount: 2500,
    date: "Dec 28, 2024",
    icon: ArrowDownLeft,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    id: 6,
    type: "sent",
    name: "Transfer to Sarah",
    description: "Book payment",
    amount: -8000,
    date: "Dec 27, 2024",
    icon: ArrowUpRight,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
  },
];

const History = () => {
  const navigate = useNavigate();

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? "-" : "+"}₦${absAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  return (
    <>
      <Helmet>
        <title>Transaction History - Bells Bank</title>
        <meta name="description" content="View your complete transaction history with Bells Bank." />
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
            <h2 className="text-2xl font-bold text-foreground">Transaction History</h2>
            <p className="text-muted-foreground text-sm mt-1">View all your past transactions</p>
          </div>

          {/* Transactions List */}
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">All Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-3 rounded-xl ${tx.iconBg}`}>
                    <tx.icon className={`h-5 w-5 ${tx.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{tx.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{tx.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                      {formatAmount(tx.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default History;

