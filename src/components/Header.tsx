import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import bellsLogo from "@/assets/bells-logo.jpeg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={bellsLogo} 
            alt="Bells Banking" 
            className="h-10 w-10 rounded-full object-cover shadow-soft"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Bells Bank</h1>
            <p className="text-xs text-muted-foreground">Digital Banking</p>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Transfers
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Cards
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            History
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
