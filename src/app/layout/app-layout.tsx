//---------- Packages ----------
import { Tooltip } from "@base-ui/react/tooltip";
import { Outlet } from "react-router-dom";

//---------- Components ----------
import AppSidebar from "@/app/layout/app-sidebar";
import { SidebarInset } from "@/shared/components/ui/sidebar/sidebar-inset";
import { SidebarProvider } from "@/shared/components/ui/sidebar/sidebar-provider";
import { SidebarTrigger } from "@/shared/components/ui/sidebar/sidebar-trigger";

export default function AppLayout() {
  return (
    <Tooltip.Provider>
      <SidebarProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <header className="flex h-14 items-center gap-2 border-b px-3 sm:px-5">
            <SidebarTrigger className="size-11 md:size-8" />
            <span className="text-sm font-semibold tracking-tight md:sr-only">
              Skill Manager
            </span>
          </header>
          <div
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-6xl px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] outline-none sm:px-8 md:px-10 md:py-10 lg:px-14"
          >
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Tooltip.Provider>
  );
}
