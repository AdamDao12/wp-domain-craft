import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, AlertTriangle, Shield, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Domain {
  id: string;
  name: string;
  url: string;
  plugins: number;
  vulnerabilities: number;
  status: "secure" | "warning" | "critical";
  lastScan: string;
}

const mockDomains: Domain[] = [
  {
    id: "1",
    name: "Example Store",
    url: "example-store.com",
    plugins: 23,
    vulnerabilities: 0,
    status: "secure",
    lastScan: "2 hours ago"
  },
  {
    id: "2",
    name: "Tech Blog",
    url: "techblog.example.com",
    plugins: 18,
    vulnerabilities: 2,
    status: "warning",
    lastScan: "4 hours ago"
  },
  {
    id: "3",
    name: "Corporate Site",
    url: "corporate.example.com",
    plugins: 31,
    vulnerabilities: 5,
    status: "critical",
    lastScan: "1 hour ago"
  },
  {
    id: "4",
    name: "Portfolio",
    url: "portfolio.example.com",
    plugins: 12,
    vulnerabilities: 0,
    status: "secure",
    lastScan: "3 hours ago"
  },
  {
    id: "5",
    name: "News Site",
    url: "news.example.com",
    plugins: 27,
    vulnerabilities: 1,
    status: "warning",
    lastScan: "5 hours ago"
  },
  {
    id: "6",
    name: "E-commerce",
    url: "shop.example.com",
    plugins: 45,
    vulnerabilities: 0,
    status: "secure",
    lastScan: "1 hour ago"
  }
];

const DomainCard = ({ domain }: { domain: Domain }) => {
  const statusConfig = {
    secure: {
      badge: "bg-success text-success-foreground",
      icon: <Shield className="h-3 w-3" />,
      border: "border-success/20"
    },
    warning: {
      badge: "bg-warning text-warning-foreground",
      icon: <AlertTriangle className="h-3 w-3" />,
      border: "border-warning/20"
    },
    critical: {
      badge: "bg-destructive text-destructive-foreground",
      icon: <AlertTriangle className="h-3 w-3" />,
      border: "border-destructive/20"
    }
  };

  const config = statusConfig[domain.status];

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${config.border}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">{domain.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Scan Now</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{domain.url}</span>
          <Badge className={config.badge}>
            {config.icon}
            <span className="ml-1 capitalize">{domain.status}</span>
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{domain.plugins}</div>
            <div className="text-xs text-muted-foreground">Plugins</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${domain.vulnerabilities > 0 ? 'text-destructive' : 'text-success'}`}>
              {domain.vulnerabilities}
            </div>
            <div className="text-xs text-muted-foreground">Vulnerabilities</div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">Last scan: {domain.lastScan}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const DomainsGrid = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Domains</h2>
        <Button>Add Domain</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDomains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </div>
    </div>
  );
};

export default DomainsGrid;