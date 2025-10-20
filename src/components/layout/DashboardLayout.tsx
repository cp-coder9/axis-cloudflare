import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
type DashboardLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};
export function DashboardLayout({ children, sidebar }: DashboardLayoutProps): JSX.Element {
  const { setRole } = useAuth();
  return (
    <SidebarProvider>
      {sidebar}
      <SidebarInset className="bg-muted/40 min-h-screen">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:justify-end">
          <div className="lg:hidden">
            <SidebarTrigger />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setRole(null)}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 md:py-10 lg:py-12">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}