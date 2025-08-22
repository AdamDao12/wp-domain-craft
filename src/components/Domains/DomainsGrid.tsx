import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, AlertTriangle, Shield, MoreHorizontal, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Domain {
  domain: string;
  url: string;
  path: string;
  ver: string;
  status: "ACTIVE" | "INACTIVE" | "ERROR";
  vulnerabilities: number;
}

const mockDomains: Domain[] = [
  {
    domain: "www.medema.cz",
    url: "https://www.medema.cz",
    path: "/web/htdocs6/medemacz/home/www",
    ver: "5.9.2",
    status: "ACTIVE",
    vulnerabilities: 0
  },
  {
    domain: "blog.example.com",
    url: "https://blog.example.com",
    path: "/var/www/html/blog",
    ver: "6.1.1",
    status: "ACTIVE",
    vulnerabilities: 2
  },
  {
    domain: "shop.website.com",
    url: "https://shop.website.com",
    path: "/home/user/public_html/shop",
    ver: "6.0.3",
    status: "ACTIVE",
    vulnerabilities: 5
  },
  {
    domain: "portfolio.dev.com",
    url: "https://portfolio.dev.com",
    path: "/var/www/portfolio",
    ver: "5.8.7",
    status: "INACTIVE",
    vulnerabilities: 0
  },
  {
    domain: "news.site.org",
    url: "https://news.site.org",
    path: "/opt/wordpress/news",
    ver: "6.2.0",
    status: "ACTIVE",
    vulnerabilities: 1
  },
  {
    domain: "company.business.com",
    url: "https://company.business.com",
    path: "/usr/share/nginx/html/company",
    ver: "5.9.8",
    status: "ERROR",
    vulnerabilities: 3
  }
];

const DomainDetailsDialog = ({ domain }: { domain: Domain }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Domain Details: {domain.domain}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Domain:</label>
          <p className="text-sm text-muted-foreground">{domain.domain}</p>
        </div>
        <div>
          <label className="text-sm font-medium">URL:</label>
          <p className="text-sm text-muted-foreground">{domain.url}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Path:</label>
          <p className="text-sm text-muted-foreground font-mono">{domain.path}</p>
        </div>
        <div>
          <label className="text-sm font-medium">WordPress Version:</label>
          <p className="text-sm text-muted-foreground">{domain.ver}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Status:</label>
          <Badge className={getStatusBadge(domain.status)}>{domain.status}</Badge>
        </div>
        <div>
          <label className="text-sm font-medium">Vulnerabilities:</label>
          <p className={`text-sm font-medium ${domain.vulnerabilities > 0 ? 'text-destructive' : 'text-success'}`}>
            {domain.vulnerabilities}
          </p>
        </div>
      </div>
    </DialogContent>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-success text-success-foreground";
    case "INACTIVE":
      return "bg-warning text-warning-foreground";
    case "ERROR":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const DomainsGrid = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Domains</h2>
        <Button>Add Domain</Button>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>WP Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vulnerabilities</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDomains.map((domain, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{domain.domain}</TableCell>
                <TableCell>{domain.url}</TableCell>
                <TableCell>{domain.ver}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(domain.status)}>
                    {domain.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={domain.vulnerabilities > 0 ? 'text-destructive font-medium' : 'text-success'}>
                    {domain.vulnerabilities}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DomainDetailsDialog domain={domain} />
                    </Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Scan Now</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Remove</DropdownMenuItem>
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

export default DomainsGrid;