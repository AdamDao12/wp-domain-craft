
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Navigation/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import DomainsGrid from "@/components/Domains/DomainsGrid";
import PluginsTable from "@/components/Plugins/PluginsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">WordPress Security Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your WordPress domains, plugins, and security vulnerabilities.
            </p>
          </div>
          
          <StatsCards />
          
          <Tabs defaultValue="domains" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="domains">Domains Overview</TabsTrigger>
              <TabsTrigger value="plugins">Plugin Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="domains" className="space-y-6">
              <DomainsGrid />
            </TabsContent>
            
            <TabsContent value="plugins" className="space-y-6">
              <PluginsTable />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
