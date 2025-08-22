import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, AlertTriangle, Filter } from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  version: string;
  domain: string;
  status: "secure" | "vulnerable" | "outdated";
  vulnerabilities: number;
  lastUpdated: string;
}

const mockPlugins: Plugin[] = [
  {
    id: "1",
    name: "WooCommerce",
    version: "7.8.2",
    domain: "example-store.com",
    status: "secure",
    vulnerabilities: 0,
    lastUpdated: "2024-01-15"
  },
  {
    id: "2", 
    name: "Yoast SEO",
    version: "20.1.0",
    domain: "techblog.example.com",
    status: "vulnerable",
    vulnerabilities: 2,
    lastUpdated: "2024-01-10"
  },
  {
    id: "3",
    name: "Elementor",
    version: "3.17.1",
    domain: "corporate.example.com",
    status: "outdated",
    vulnerabilities: 1,
    lastUpdated: "2023-12-20"
  },
  {
    id: "4",
    name: "Contact Form 7",
    version: "5.8.4",
    domain: "portfolio.example.com",
    status: "secure",
    vulnerabilities: 0,
    lastUpdated: "2024-01-12"
  },
  {
    id: "5",
    name: "Akismet",
    version: "5.3.1",
    domain: "news.example.com",
    status: "vulnerable",
    vulnerabilities: 1,
    lastUpdated: "2024-01-08"
  }
];

const PluginsTable = () => {
  const getStatusBadge = (status: string, vulnerabilities: number) => {
    switch (status) {
      case "secure":
        return (
          <Badge className="bg-success text-success-foreground">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
        );
      case "vulnerable":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {vulnerabilities} Vuln{vulnerabilities !== 1 ? 's' : ''}
          </Badge>
        );
      case "outdated":
        return (
          <Badge className="bg-warning text-warning-foreground">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Outdated
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Plugins Management</h2>
        <Button>Scan All</Button>
      </div>
      
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plugins..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plugins</SelectItem>
            <SelectItem value="secure">Secure</SelectItem>
            <SelectItem value="vulnerable">Vulnerable</SelectItem>
            <SelectItem value="outdated">Outdated</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="example-store.com">example-store.com</SelectItem>
            <SelectItem value="techblog.example.com">techblog.example.com</SelectItem>
            <SelectItem value="corporate.example.com">corporate.example.com</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plugin Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vulnerabilities</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPlugins.map((plugin) => (
              <TableRow key={plugin.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{plugin.name}</TableCell>
                <TableCell>{plugin.version}</TableCell>
                <TableCell className="text-muted-foreground">{plugin.domain}</TableCell>
                <TableCell>
                  {getStatusBadge(plugin.status, plugin.vulnerabilities)}
                </TableCell>
                <TableCell>
                  <span className={plugin.vulnerabilities > 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
                    {plugin.vulnerabilities}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{plugin.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    {plugin.status === "vulnerable" && (
                      <Button variant="outline" size="sm" className="text-destructive border-destructive">
                        Fix
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PluginsTable;