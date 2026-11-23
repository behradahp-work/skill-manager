//---------- Packages ----------
import { Layers3 } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import AppNavigation from "@/app/layout/app-navigation";
import { SidebarContent } from "@/shared/components/ui/sidebar/sidebar-content";
import { SidebarHeader } from "@/shared/components/ui/sidebar/sidebar-header";
import { SidebarMenuButton } from "@/shared/components/ui/sidebar/sidebar-menu-button";
import { Sidebar } from "@/shared/components/ui/sidebar/sidebar";

//---------- Hooks ----------
import { useSidebar } from "@/shared/components/ui/sidebar/sidebar-context";

export default function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="pr-14 md:pr-2">
        <SidebarMenuButton
          size="lg"
          tooltip="Skill Manager"
          render={<Link to="/" onClick={() => setOpenMobile(false)} />}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Layers3 aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight">Skill Manager</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-3">
        <AppNavigation />
      </SidebarContent>
    </Sidebar>
  );
}
