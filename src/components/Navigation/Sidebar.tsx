import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Globe, 
  Shield, 
  AlertTriangle, 
  Settings, 
  BarChart3,
  Filter
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "#"
    },
    {
      id: "domains",
      label: "Domains",
      icon: Globe,
      href: "#"
    },
    {
      id: "plugins",
      label: "Plugins",
      icon: Shield,
      href: "#"
    },
    {
      id: "vulnerabilities",
      label: "Vulnerabilities",
      icon: AlertTriangle,
      href: "#"
    },
    {
      id: "analytics",
      label: "Analytics", 
      icon: BarChart3,
      href: "#"
    },
    {
      id: "filters",
      label: "Filters",
      icon: Filter,
      href: "#"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "#"
    }
  ];

  return (
    <aside className={cn("pb-12 w-64 border-r bg-card/50", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeItem === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    activeItem === item.id && "bg-primary/10 text-primary font-medium"
                  )}
                  onClick={() => setActiveItem(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;