import { ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  description: string;
  recipient_name: string | null;
  status: string;
  created_at: string;
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  return date.toLocaleDateString('en-NG', { 
    month: 'short', 
    day: 'numeric' 
  });
};

const TransactionList = () => {
  const { user } = useAuth();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!user?.id,
  });

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <Link to="/history" className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors">
          View All
        </Link>
      </div>
      
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Your transactions will appear here</p>
          </div>
        ) : (
          transactions.map((transaction, index) => {
            const isCredit = transaction.type === 'credit';
            const displayAmount = isCredit ? transaction.amount : -transaction.amount;
            
            return (
              <div
                key={transaction.id}
                className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                  index !== transactions.length - 1 ? "border-b border-border" : ""
                }`}
              >
                {/* Icon */}
                <div className={`p-3 rounded-xl ${isCredit ? "bg-accent/10" : "bg-secondary/10"}`}>
                  {isCredit ? (
                    <ArrowDownLeft className="h-5 w-5 text-accent" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-secondary" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {transaction.recipient_name || transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {transaction.description}
                  </p>
                </div>

                {/* Amount & Date */}
                <div className="text-right">
                  <p className={`text-sm font-bold ${isCredit ? "text-accent" : "text-foreground"}`}>
                    {isCredit ? "+" : "-"}₦{formatAmount(Math.abs(displayAmount))}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.created_at)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TransactionList;