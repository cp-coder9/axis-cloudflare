import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Library,
  BarChart3,
  FileText,
  Bot,
  Settings,
  LifeBuoy,
  Search,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const mainNav = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/team", icon: Users, label: "Team" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];
const docsNav = [
  { to: "/admin/data-library", icon: Library, label: "Data Library" },
  { to: "/admin/reports", icon: FileText, label: "Reports" },
  { to: "/admin/word-assistant", icon: Bot, label: "Word Assistant" },
];
const helpNav = [
  { to: "/admin/settings", icon: Settings, label: "Settings" },
  { to: "/admin/help", icon: LifeBuoy, label: "Help & Support" },
  { to: "/admin/search", icon: Search, label: "Search" },
];
export function AdminSidebar(): JSX.Element {
  const location = useLocation();
  const renderNav = (items: typeof mainNav) =>
    items.map((item) => (
      <SidebarMenuItem key={item.to}>
        <SidebarMenuButton
          asChild
          isActive={item.to === "/admin/dashboard" ? location.pathname === item.to : location.pathname.startsWith(item.to)}
        >
          <NavLink to={item.to}>
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Building2 className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-semibold">Architex Axis</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>{renderNav(mainNav)}</SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Documents & Reports</SidebarGroupLabel>
          <SidebarMenu>{renderNav(docsNav)}</SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>{renderNav(helpNav)}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}