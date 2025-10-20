import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  FileText,
  Calendar,
  Settings,
  Bell,
  LifeBuoy,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
const mainNav = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/projects", icon: FolderKanban, label: "My Projects" },
  { to: "/client/messages", icon: MessageSquare, label: "Communication" },
  { to: "/client/files", icon: FileText, label: "Files & Documents" },
  { to: "/client/calendar", icon: Calendar, label: "Schedule" },
];
const secondaryNav = [
  { to: "/client/notifications", icon: Bell, label: "Notifications" },
  { to: "/client/settings", icon: Settings, label: "Settings" },
  { to: "/client/support", icon: LifeBuoy, label: "Help & Support" },
];
export function ClientSidebar(): JSX.Element {
  const location = useLocation();
  const renderNav = (items: typeof mainNav) =>
    items.map((item) => (
      <SidebarMenuItem key={item.to}>
        <SidebarMenuButton
          asChild
          isActive={location.pathname.startsWith(item.to)}
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
          <span className="text-lg font-semibold">Client Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>{renderNav(mainNav)}</SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>{renderNav(secondaryNav)}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}