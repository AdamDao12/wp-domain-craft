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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ExternalLink, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Vulnerability {
  domain: string;
  pluginSlug: string;
  currentVersion: string;
  patchedVersion: string;
  pluginPath: string;
  cvssRating: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  checkTime: string;
  vulnerabilityDescription: string;
}

const mockVulnerabilities: Vulnerability[] = [
  {
    domain: "www.medema.cz",
    pluginSlug: "contact-form-7",
    currentVersion: "5.6.4",
    patchedVersion: "5.7.1",
    pluginPath: "/wp-content/plugins/contact-form-7/",
    cvssRating: 9.1,
    priority: "Critical",
    checkTime: "2024-01-15 14:30:22",
    vulnerabilityDescription: "SQL Injection vulnerability in form processing allows unauthorized database access"
  },
  {
    domain: "blog.example.com",
    pluginSlug: "woocommerce",
    currentVersion: "7.8.2",
    patchedVersion: "7.9.0",
    pluginPath: "/wp-content/plugins/woocommerce/",
    cvssRating: 7.5,
    priority: "High",
    checkTime: "2024-01-15 13:45:10",
    vulnerabilityDescription: "Cross-Site Scripting (XSS) in product search functionality"
  },
  {
    domain: "shop.website.com",
    pluginSlug: "user-role-editor",
    currentVersion: "4.62.3",
    patchedVersion: "4.63.0",
    pluginPath: "/wp-content/plugins/user-role-editor/",
    cvssRating: 8.8,
    priority: "Critical",
    checkTime: "2024-01-15 12:20:45",
    vulnerabilityDescription: "Authentication bypass vulnerability allows unauthorized admin access"
  },
  {
    domain: "news.site.org",
    pluginSlug: "wp-file-manager",
    currentVersion: "7.1.5",
    patchedVersion: "7.1.8",
    pluginPath: "/wp-content/plugins/wp-file-manager/",
    cvssRating: 6.3,
    priority: "Medium",
    checkTime: "2024-01-15 11:15:33",
    vulnerabilityDescription: "Directory traversal vulnerability in file upload functionality"
  },
  {
    domain: "company.business.com",
    pluginSlug: "yoast-seo",
    currentVersion: "20.8",
    patchedVersion: "20.9",
    pluginPath: "/wp-content/plugins/wordpress-seo/",
    cvssRating: 4.2,
    priority: "Low",
    checkTime: "2024-01-15 10:30:18",
    vulnerabilityDescription: "Information disclosure through debug output in development mode"
  },
  {
    domain: "blog.example.com",
    pluginSlug: "elementor",
    currentVersion: "3.14.1",
    patchedVersion: "3.15.0",
    pluginPath: "/wp-content/plugins/elementor/",
    cvssRating: 5.8,
    priority: "Medium",
    checkTime: "2024-01-15 09:45:27",
    vulnerabilityDescription: "Cross-Site Request Forgery (CSRF) in widget configuration"
  }
];

const VulnerabilitiesTable = () => {
  const getPriorityBadge = (priority: string) => {
    const config = {
      Critical: "bg-destructive text-destructive-foreground",
      High: "bg-orange-500 text-white",
      Medium: "bg-yellow-500 text-black",
      Low: "bg-blue-500 text-white"
    };
    return config[priority as keyof typeof config] || "bg-gray-500 text-white";
  };

  const getCVSSColor = (rating: number) => {
    if (rating >= 9.0) return "text-destructive font-bold";
    if (rating >= 7.0) return "text-orange-600 font-semibold";
    if (rating >= 4.0) return "text-yellow-600 font-medium";
    return "text-blue-600";
  };

  const priorityCounts = {
    Critical: mockVulnerabilities.filter(v => v.priority === "Critical").length,
    High: mockVulnerabilities.filter(v => v.priority === "High").length,
    Medium: mockVulnerabilities.filter(v => v.priority === "Medium").length,
    Low: mockVulnerabilities.filter(v => v.priority === "Low").length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Security Vulnerabilities</h2>
        <Button>Scan All Sites</Button>
      </div>

      {/* Priority Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{priorityCounts.Critical}</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{priorityCounts.High}</div>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{priorityCounts.Medium}</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{priorityCounts.Low}</div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerabilities Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>Plugin Slug</TableHead>
              <TableHead>Current Version</TableHead>
              <TableHead>Patched Version</TableHead>
              <TableHead>Plugin Path</TableHead>
              <TableHead>CVSS Rating</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Check Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVulnerabilities.map((vuln, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{vuln.domain}</TableCell>
                <TableCell>
                  <code className="text-sm bg-muted px-2 py-1 rounded">{vuln.pluginSlug}</code>
                </TableCell>
                <TableCell>{vuln.currentVersion}</TableCell>
                <TableCell className="font-medium text-success">{vuln.patchedVersion}</TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{vuln.pluginPath}</code>
                </TableCell>
                <TableCell>
                  <span className={getCVSSColor(vuln.cvssRating)}>
                    {vuln.cvssRating.toFixed(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityBadge(vuln.priority)}>
                    {vuln.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{vuln.checkTime}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" title={vuln.vulnerabilityDescription}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Plugin</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Fixed</DropdownMenuItem>
                        <DropdownMenuItem>Ignore</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default VulnerabilitiesTable;