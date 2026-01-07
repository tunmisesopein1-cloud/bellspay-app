import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import TransactionList from "@/components/TransactionList";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet";

const Index = () => {
  const { profile } = useAuth();

  const displayName = profile?.full_name?.split(" ")[0] || "Student";

  return (
    <>
      <Helmet>
        <title>Bells Bank - Digital Banking Made Simple</title>
        <meta
          name="description"
          content="Send, receive, and manage your money with Bells Bank. The modern digital banking solution for students and professionals."
        />
      </Helmet>

      <div className="min-h-screen bg-background pb-24 md:pb-8">
        <Header />

        <main className="container py-6 space-y-6">
          {/* Welcome Message */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, <span className="text-gradient-gold">{displayName}</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Here's your financial overview</p>
          </div>

          {/* Balance Card */}
          <BalanceCard />

          {/* Quick Actions */}
          <QuickActions />

          {/* Transactions */}
          <TransactionList />
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </>
  );
};

export default Index;

