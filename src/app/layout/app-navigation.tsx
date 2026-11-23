//---------- Packages ----------
import { FolderOpen, LayoutDashboard } from "lucide-react";
import { NavLink, matchPath, useLocation } from "react-router-dom";

//---------- Components ----------
import { SidebarMenu } from "@/shared/components/ui/sidebar/sidebar-menu";
import { SidebarMenuButton } from "@/shared/components/ui/sidebar/sidebar-menu-button";
import { SidebarMenuItem } from "@/shared/components/ui/sidebar/sidebar-menu-item";

//---------- Hooks ----------
import { useSidebar } from "@/shared/components/ui/sidebar/sidebar-context";

const destinations = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/topics", label: "Topics", icon: FolderOpen, end: false },
] as const;

export default function AppNavigation() {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <nav aria-label="Main navigation">
      <SidebarMenu>
        {destinations.map(({ to, label, icon: Icon, end }) => (
          <SidebarMenuItem key={to}>
            <SidebarMenuButton
              className="h-11 md:h-9"
              isActive={Boolean(matchPath({ path: to, end }, pathname))}
              tooltip={label}
              render={
                <NavLink to={to} end={end} onClick={() => setOpenMobile(false)} />
              }
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
