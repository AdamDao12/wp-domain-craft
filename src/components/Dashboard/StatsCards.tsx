import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

const StatCard = ({ title, value, change, icon, variant = "default" }: StatCardProps) => {
  const variants = {
    default: "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
    success: "border-success/20 bg-gradient-to-br from-success/5 to-success/10",
    warning: "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10",
    destructive: "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10"
  };

  return (
    <Card className={`${variants[variant]} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </CardContent>
    </Card>
  );
};

const StatsCards = () => {
  const stats = [
    {
      title: "Total Domains",
      value: "247",
      change: "+12% from last month",
      icon: <Globe className="h-4 w-4 text-primary-foreground" />,
      variant: "default" as const
    },
    {
      title: "Active Plugins",
      value: "1,842",
      change: "+3% from last month",
      icon: <Shield className="h-4 w-4 text-primary-foreground" />,
      variant: "success" as const
    },
    {
      title: "Vulnerabilities",
      value: "23",
      change: "-18% from last month",
      icon: <AlertTriangle className="h-4 w-4 text-primary-foreground" />,
      variant: "destructive" as const
    },
    {
      title: "Secure Sites",
      value: "224",
      change: "+8% from last month",
      icon: <CheckCircle className="h-4 w-4 text-primary-foreground" />,
      variant: "success" as const
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;