import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Timer,
  FolderKanban,
  DollarSign,
  FileCheck2,
  Settings,
  Bell,
  User,
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
  { to: "/freelancer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/freelancer/timer", icon: Timer, label: "Timer & Tracking" },
  { to: "/freelancer/projects", icon: FolderKanban, label: "Projects" },
  { to: "/freelancer/earnings", icon: DollarSign, label: "Earnings" },
  { to: "/freelancer/applications", icon: FileCheck2, label: "Applications" },
];
const secondaryNav = [
  { to: "/freelancer/settings", icon: Settings, label: "Settings" },
  { to: "/freelancer/notifications", icon: Bell, label: "Notifications" },
  { to: "/freelancer/profile", icon: User, label: "Profile" },
];
export function FreelancerSidebar(): JSX.Element {
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
          <span className="text-lg font-semibold">Freelancer Hub</span>
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