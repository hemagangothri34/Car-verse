
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Settings, 
  Menu, 
  X, 
  Bell,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem("carverse-user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of CarVerse",
      duration: 3000,
    });
    navigate("/");
  };
  
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: "Buy Cars", 
      path: "/buy", 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      name: "Rent Cars", 
      path: "/rent", 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      name: "Sell Your Car", 
      path: "/sell", 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      name: "Services", 
      path: "/services", 
      icon: <Settings className="h-5 w-5" /> 
    },
    { 
      name: "Calendar", 
      path: "/calendar", 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: "Messages", 
      path: "/messages", 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
  ];
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const username = JSON.parse(localStorage.getItem("carverse-user") || '{"name":"User"}').name;
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="bg-card border-b border-border h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
          <div className="font-bold text-xl ml-2">CarVerse</div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-primary rounded-full w-3 h-3" />
          </Button>
          
          <div className="hidden md:flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{username}</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`fixed lg:static top-16 bottom-0 left-0 w-64 border-r border-border bg-card transform transition-transform z-40
                     ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`justify-start btn-nav ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
