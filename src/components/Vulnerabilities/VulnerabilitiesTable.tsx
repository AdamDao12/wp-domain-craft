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
import { AlertTriangle, Shield, Bug, Calendar, ExternalLink } from "lucide-react";

interface Vulnerability {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  domain: string;
  plugin: string;
  cve: string;
  discovered: string;
  status: "open" | "patching" | "fixed";
  description: string;
}

const mockVulnerabilities: Vulnerability[] = [
  {
    id: "1",
    title: "SQL Injection in Contact Form",
    severity: "critical",
    domain: "corporate.example.com",
    plugin: "Contact Form 7",
    cve: "CVE-2024-0001",
    discovered: "2024-01-20",
    status: "open",
    description: "Remote code execution via unsanitized input fields"
  },
  {
    id: "2",
    title: "XSS Vulnerability in Comments",
    severity: "high",
    domain: "techblog.example.com",
    plugin: "Yoast SEO",
    cve: "CVE-2024-0002",
    discovered: "2024-01-18",
    status: "patching",
    description: "Cross-site scripting through comment metadata"
  },
  {
    id: "3",
    title: "Path Traversal in File Upload",
    severity: "medium",
    domain: "corporate.example.com",
    plugin: "Elementor",
    cve: "CVE-2024-0003",
    discovered: "2024-01-15",
    status: "open",
    description: "Unauthorized file access via directory traversal"
  },
  {
    id: "4",
    title: "CSRF in Admin Panel",
    severity: "medium",
    domain: "news.example.com",
    plugin: "Akismet",
    cve: "CVE-2024-0004",
    discovered: "2024-01-12",
    status: "fixed",
    description: "Cross-site request forgery in settings page"
  },
  {
    id: "5",
    title: "Information Disclosure",
    severity: "low",
    domain: "portfolio.example.com",
    plugin: "WP Super Cache",
    cve: "CVE-2024-0005",
    discovered: "2024-01-10",
    status: "open",
    description: "Sensitive information exposed in debug logs"
  }
];

const VulnerabilitiesTable = () => {
  const getSeverityBadge = (severity: string) => {
    const config = {
      critical: "bg-destructive text-destructive-foreground",
      high: "bg-orange-500 text-white",
      medium: "bg-warning text-warning-foreground",
      low: "bg-blue-500 text-white"
    };
    
    return (
      <Badge className={config[severity as keyof typeof config]}>
        <AlertTriangle className="h-3 w-3 mr-1" />
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const config = {
      open: "bg-destructive text-destructive-foreground",
      patching: "bg-warning text-warning-foreground", 
      fixed: "bg-success text-success-foreground"
    };
    
    const icons = {
      open: <Bug className="h-3 w-3 mr-1" />,
      patching: <Shield className="h-3 w-3 mr-1" />,
      fixed: <Shield className="h-3 w-3 mr-1" />
    };
    
    return (
      <Badge className={config[status as keyof typeof config]}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const severityCounts = {
    critical: mockVulnerabilities.filter(v => v.severity === "critical").length,
    high: mockVulnerabilities.filter(v => v.severity === "high").length,
    medium: mockVulnerabilities.filter(v => v.severity === "medium").length,
    low: mockVulnerabilities.filter(v => v.severity === "low").length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Security Vulnerabilities</h2>
        <Button>Scan All Sites</Button>
      </div>

      {/* Severity Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{severityCounts.critical}</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{severityCounts.high}</div>
          </CardContent>
        </Card>
        
        <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{severityCounts.medium}</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{severityCounts.low}</div>
          </CardContent>
        </Card>
      </div>

      {/* Vulnerabilities Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vulnerability</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Plugin</TableHead>
              <TableHead>CVE</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Discovered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVulnerabilities.map((vuln) => (
              <TableRow key={vuln.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{vuln.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {vuln.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                <TableCell className="text-muted-foreground">{vuln.domain}</TableCell>
                <TableCell>{vuln.plugin}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{vuln.cve}</code>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {vuln.discovered}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Details</Button>
                    {vuln.status === "open" && (
                      <Button size="sm" className="bg-destructive text-destructive-foreground">
                        Fix Now
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

export default VulnerabilitiesTable;