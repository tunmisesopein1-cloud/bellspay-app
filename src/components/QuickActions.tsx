import { ArrowUpRight, ArrowDownLeft, Plus, QrCode, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (label: string) => {
    switch (label) {
      case "Send":
        navigate("/transfer");
        break;
      case "Receive":
        toast({
          title: "Request Payment",
          description: "Share your matric number or phone to receive payments"
        });
        break;
      case "Top Up":
        toast({
          title: "Top Up",
          description: "Fund your account via bank transfer or card"
        });
        break;
      case "Scan QR":
        toast({
          title: "QR Scanner",
          description: "QR code scanning coming soon!"
        });
        break;
      case "Airtime":
        toast({
          title: "Buy Airtime",
          description: "Airtime purchase coming soon!"
        });
        break;
      case "Bills":
        toast({
          title: "Pay Bills",
          description: "Bill payment coming soon!"
        });
        break;
    }
  };

  const actions = [
    {
      icon: ArrowUpRight,
      label: "Send",
      description: "Transfer money",
      color: "bg-secondary/10 text-secondary hover:bg-secondary/20",
      iconBg: "bg-secondary",
    },
    {
      icon: ArrowDownLeft,
      label: "Receive",
      description: "Request payment",
      color: "bg-accent/10 text-accent hover:bg-accent/20",
      iconBg: "bg-accent",
    },
    {
      icon: Plus,
      label: "Top Up",
      description: "Add funds",
      color: "bg-primary/10 text-primary hover:bg-primary/20",
      iconBg: "bg-primary",
    },
    {
      icon: QrCode,
      label: "Scan QR",
      description: "Scan to pay",
      color: "bg-navy/10 text-navy hover:bg-navy/20",
      iconBg: "bg-navy",
    },
    {
      icon: Smartphone,
      label: "Airtime",
      description: "Buy airtime",
      color: "bg-emerald/10 text-emerald hover:bg-emerald/20",
      iconBg: "bg-emerald",
    },
    {
      icon: CreditCard,
      label: "Bills",
      description: "Pay bills",
      color: "bg-gold/10 text-gold-dark hover:bg-gold/20",
      iconBg: "bg-gold",
    },
  ];

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="action"
            className={`flex flex-col h-auto py-4 px-3 gap-2 ${action.color} border-0`}
            onClick={() => handleAction(action.label)}
          >
            <div className={`p-2.5 rounded-xl ${action.iconBg}`}>
              <action.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">{action.label}</p>
              <p className="text-[10px] text-muted-foreground hidden sm:block">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
