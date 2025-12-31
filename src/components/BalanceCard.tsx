import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const balance = 2547890.50;
  const currency = "₦";

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl gradient-card p-6 sm:p-8 shadow-gold animate-slide-up">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 border border-primary-foreground/30 rounded-full" />
        <div className="absolute top-8 right-8 w-12 h-12 border border-primary-foreground/20 rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Card header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-primary/70 font-medium">Total Balance</p>
            <p className="text-xs text-primary/50 mt-0.5">Savings Account</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="text-primary/70 hover:text-primary hover:bg-primary/10"
          >
            {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
        </div>

        {/* Balance */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            {showBalance ? (
              <>
                {currency}{formatBalance(balance)}
              </>
            ) : (
              "••••••••"
            )}
          </h2>
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-full">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">+12.5%</span>
            <span className="text-xs text-primary/60">this month</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-primary/50">Account Number</p>
            <p className="text-sm font-medium text-primary/80">**** 4589</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
