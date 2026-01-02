import { Bell, Menu, User, LogOut, LogIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import bellsLogo from "@/assets/bells-logo.jpeg";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
      navigate("/auth");
    } else {
      navigate("/auth");
    }
  };

  const navLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Transfers", path: "/transfer" },
    { label: "Cards", path: "/cards" },
    { label: "History", path: "/history" },
  ];

  const notifications = [
    { id: 1, title: "Welcome to Bells Bank!", message: "Thank you for joining us.", time: "Just now" },
    { id: 2, title: "Security Update", message: "Your account is protected.", time: "1 hour ago" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={bellsLogo} 
            alt="Bells Banking" 
            className="h-10 w-10 rounded-full object-cover shadow-soft"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Bells Bank</h1>
            <p className="text-xs text-muted-foreground">Digital Banking</p>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <p className="font-medium text-foreground text-sm">{notification.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{notification.message}</p>
                    <p className="text-muted-foreground text-xs mt-2">{notification.time}</p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex"
                onClick={() => navigate("/profile")}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAuthAction}
                className="hidden sm:flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button 
              variant="gold" 
              size="sm" 
              onClick={handleAuthAction}
              className="hidden sm:flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          )}
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium p-2 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "bg-secondary/10 text-secondary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium p-2 rounded-lg transition-colors ${
                        location.pathname === "/profile"
                          ? "bg-secondary/10 text-secondary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Profile
                    </Link>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        handleAuthAction();
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start text-destructive hover:text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
                {!user && (
                  <Button 
                    variant="gold" 
                    onClick={() => {
                      navigate("/auth");
                      setMobileMenuOpen(false);
                    }}
                    className="mt-4"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
