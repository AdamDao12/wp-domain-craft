import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Filter, 
  Search, 
  Calendar, 
  Shield, 
  AlertTriangle, 
  Globe, 
  Package, 
  X,
  Save,
  RefreshCw 
} from "lucide-react";
import { useState } from "react";

interface FilterState {
  searchTerm: string;
  severityLevels: string[];
  domains: string[];
  plugins: string[];
  dateRange: string;
  status: string[];
  customFilters: { name: string; value: string }[];
}

const FiltersPanel = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    severityLevels: [],
    domains: [],
    plugins: [],
    dateRange: "30d",
    status: [],
    customFilters: []
  });

  const [savedFilters] = useState([
    { id: "1", name: "Critical Issues", count: 5 },
    { id: "2", name: "WooCommerce Sites", count: 12 },
    { id: "3", name: "Recent Scans", count: 8 }
  ]);

  const availableDomains = [
    "example-store.com",
    "techblog.example.com", 
    "corporate.example.com",
    "portfolio.example.com",
    "news.example.com",
    "shop.example.com"
  ];

  const availablePlugins = [
    "WooCommerce",
    "Yoast SEO",
    "Elementor",
    "Contact Form 7",
    "Akismet",
    "WP Super Cache"
  ];

  const handleSeverityChange = (severity: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      severityLevels: checked 
        ? [...prev.severityLevels, severity]
        : prev.severityLevels.filter(s => s !== severity)
    }));
  };

  const handleDomainChange = (domain: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      domains: checked 
        ? [...prev.domains, domain]
        : prev.domains.filter(d => d !== domain)
    }));
  };

  const handlePluginChange = (plugin: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      plugins: checked 
        ? [...prev.plugins, plugin]
        : prev.plugins.filter(p => p !== plugin)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: "",
      severityLevels: [],
      domains: [],
      plugins: [],
      dateRange: "30d",
      status: [],
      customFilters: []
    });
  };

  const getActiveFilterCount = () => {
    return filters.severityLevels.length + 
           filters.domains.length + 
           filters.plugins.length + 
           filters.status.length +
           (filters.searchTerm ? 1 : 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Advanced Filters</h2>
          <Badge variant="secondary" className="text-xs">
            {getActiveFilterCount()} active filters
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearAllFilters}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Search */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Quick Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search domains, plugins, vulnerabilities..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Saved Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Saved Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedFilters.map(filter => (
              <div key={filter.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div>
                  <div className="font-medium">{filter.name}</div>
                  <div className="text-xs text-muted-foreground">{filter.count} results</div>
                </div>
                <Button variant="ghost" size="sm">Apply</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Filters */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <Tabs defaultValue="severity" className="w-full">
              <div className="border-b px-6 py-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="severity">Severity</TabsTrigger>
                  <TabsTrigger value="domains">Domains</TabsTrigger>
                  <TabsTrigger value="plugins">Plugins</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="severity" className="space-y-4 mt-0">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Vulnerability Severity</Label>
                    {["critical", "high", "medium", "low"].map(severity => (
                      <div key={severity} className="flex items-center space-x-2">
                        <Checkbox
                          id={severity}
                          checked={filters.severityLevels.includes(severity)}
                          onCheckedChange={(checked) => handleSeverityChange(severity, !!checked)}
                        />
                        <Label htmlFor={severity} className="flex items-center gap-2 cursor-pointer">
                          <AlertTriangle className={`h-3 w-3 ${
                            severity === "critical" ? "text-destructive" :
                            severity === "high" ? "text-orange-500" :
                            severity === "medium" ? "text-warning" :
                            "text-blue-500"
                          }`} />
                          {severity.charAt(0).toUpperCase() + severity.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Status</Label>
                    {["open", "patching", "fixed"].map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={status}
                          checked={filters.status.includes(status)}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({
                              ...prev,
                              status: checked 
                                ? [...prev.status, status]
                                : prev.status.filter(s => s !== status)
                            }))
                          }
                        />
                        <Label htmlFor={status} className="cursor-pointer">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="domains" className="space-y-4 mt-0">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Select Domains
                  </Label>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {availableDomains.map(domain => (
                      <div key={domain} className="flex items-center space-x-2">
                        <Checkbox
                          id={domain}
                          checked={filters.domains.includes(domain)}
                          onCheckedChange={(checked) => handleDomainChange(domain, !!checked)}
                        />
                        <Label htmlFor={domain} className="cursor-pointer">
                          {domain}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="plugins" className="space-y-4 mt-0">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Select Plugins
                  </Label>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {availablePlugins.map(plugin => (
                      <div key={plugin} className="flex items-center space-x-2">
                        <Checkbox
                          id={plugin}
                          checked={filters.plugins.includes(plugin)}
                          onCheckedChange={(checked) => handlePluginChange(plugin, !!checked)}
                        />
                        <Label htmlFor={plugin} className="cursor-pointer">
                          {plugin}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-0">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        Date Range
                      </Label>
                      <Select value={filters.dateRange} onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, dateRange: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="1y">Last year</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">CVE Score Range</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Min" type="number" min="0" max="10" step="0.1" />
                        <Input placeholder="Max" type="number" min="0" max="10" step="0.1" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Custom Tag</Label>
                      <Input placeholder="Enter custom filter tag..." />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {filters.searchTerm}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => 
                    setFilters(prev => ({ ...prev, searchTerm: "" }))
                  } />
                </Badge>
              )}
              
              {filters.severityLevels.map(severity => (
                <Badge key={severity} variant="secondary" className="flex items-center gap-1">
                  {severity}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => 
                    handleSeverityChange(severity, false)
                  } />
                </Badge>
              ))}
              
              {filters.domains.map(domain => (
                <Badge key={domain} variant="secondary" className="flex items-center gap-1">
                  {domain}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => 
                    handleDomainChange(domain, false)
                  } />
                </Badge>
              ))}
              
              {filters.plugins.map(plugin => (
                <Badge key={plugin} variant="secondary" className="flex items-center gap-1">
                  {plugin}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => 
                    handlePluginChange(plugin, false)
                  } />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FiltersPanel;