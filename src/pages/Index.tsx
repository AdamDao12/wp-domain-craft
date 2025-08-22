
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Navigation/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import DomainsGrid from "@/components/Domains/DomainsGrid";
import PluginsTable from "@/components/Plugins/PluginsTable";
import VulnerabilitiesTable from "@/components/Vulnerabilities/VulnerabilitiesTable";
import AnalyticsDashboard from "@/components/Analytics/AnalyticsDashboard";
import FiltersPanel from "@/components/Filters/FiltersPanel";
import SettingsPanel from "@/components/Settings/SettingsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("domains");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">WordPress Security Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your WordPress domains, plugins, and security vulnerabilities.
            </p>
          </div>
          
          <StatsCards />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-full">
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="plugins">Plugins</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="filters">Filters</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="domains" className="space-y-6">
              <DomainsGrid />
            </TabsContent>
            
            <TabsContent value="plugins" className="space-y-6">
              <PluginsTable />
            </TabsContent>
            
            <TabsContent value="vulnerabilities" className="space-y-6">
              <VulnerabilitiesTable />
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsDashboard />
            </TabsContent>
            
            <TabsContent value="filters" className="space-y-6">
              <FiltersPanel />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
