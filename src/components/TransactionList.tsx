import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Wifi, Smartphone, Coffee } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "received",
    name: "Adebayo Samuel",
    description: "Monthly allowance",
    amount: 150000,
    date: "Today, 2:30 PM",
    icon: ArrowDownLeft,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    id: 2,
    type: "sent",
    name: "MTN Airtime",
    description: "Mobile top-up",
    amount: -2000,
    date: "Today, 11:15 AM",
    icon: Smartphone,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    id: 3,
    type: "sent",
    name: "Netflix Subscription",
    description: "Entertainment",
    amount: -4500,
    date: "Yesterday",
    icon: Wifi,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    id: 4,
    type: "sent",
    name: "Shoprite",
    description: "Groceries",
    amount: -35600,
    date: "Dec 28",
    icon: ShoppingBag,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 5,
    type: "received",
    name: "Freelance Payment",
    description: "Web development",
    amount: 250000,
    date: "Dec 27",
    icon: ArrowDownLeft,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    id: 6,
    type: "sent",
    name: "Campus Cafe",
    description: "Food & Drinks",
    amount: -3500,
    date: "Dec 26",
    icon: Coffee,
    iconBg: "bg-gold/10",
    iconColor: "text-gold-dark",
  },
];

const formatAmount = (amount: number) => {
  const absAmount = Math.abs(amount);
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absAmount);
};

const TransactionList = () => {
  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
              index !== transactions.length - 1 ? "border-b border-border" : ""
            }`}
          >
            {/* Icon */}
            <div className={`p-3 rounded-xl ${transaction.iconBg}`}>
              <transaction.icon className={`h-5 w-5 ${transaction.iconColor}`} />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {transaction.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {transaction.description}
              </p>
            </div>

            {/* Amount & Date */}
            <div className="text-right">
              <p className={`text-sm font-bold ${
                transaction.amount > 0 ? "text-accent" : "text-foreground"
              }`}>
                {transaction.amount > 0 ? "+" : "-"}₦{formatAmount(transaction.amount)}
              </p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
