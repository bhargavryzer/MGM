import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Heart, 
  Calendar, 
  Sparkles, 
  Home,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardHome from "@/components/dashboard/DashboardHome";
import CustomJewelryRequest from "@/components/dashboard/CustomJewelryRequest";
import Wishlist from "@/components/dashboard/Wishlist";
import MyAppointments from "@/components/dashboard/MyAppointments";
import ProfileSettings from "@/components/dashboard/ProfileSettings";

type TabType = "home" | "custom-request" | "wishlist" | "appointments" | "settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "home" as TabType, label: "Dashboard", icon: Home },
    { id: "custom-request" as TabType, label: "Custom Jewelry", icon: Sparkles },
    { id: "wishlist" as TabType, label: "Wishlist", icon: Heart },
    { id: "appointments" as TabType, label: "Appointments", icon: Calendar },
    { id: "settings" as TabType, label: "Profile Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome onNavigate={setActiveTab} />;
      case "custom-request":
        return <CustomJewelryRequest />;
      case "wishlist":
        return <Wishlist />;
      case "appointments":
        return <MyAppointments />;
      case "settings":
        return <ProfileSettings />;
      default:
        return <DashboardHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/images/header-logo.png" 
              alt="MGM MEGA GOLD MART Logo" 
              className="h-8 w-auto"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-mgm text-primary-foreground border-r border-border/20 z-50 
          lg:translate-x-0 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/20 flex justify-center">
            <Link to="/" className="flex items-center justify-center">
              <img 
                src="/images/footer-logo.png" 
                alt="MGM MEGA GOLD MART Logo" 
                className="h-8 w-auto max-w-full object-contain"
              />
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-primary-foreground/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Welcome Back</p>
                <p className="text-sm text-primary-foreground/80">Guest User</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${activeTab === item.id 
                    ? "bg-primary-foreground text-primary" 
                    : "text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-primary-foreground/20 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4" />
              Back to Store
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground"
              onClick={() => navigate("/signin")}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
