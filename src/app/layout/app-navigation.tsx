//---------- Packages ----------
import { FolderOpen, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

//---------- Utilities ----------
import { cn } from "@/shared/lib/utils";

const destinations = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/topics", label: "Topics", icon: FolderOpen, end: false },
] as const;

export default function AppNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-2 gap-2 border-t bg-card px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:static md:flex md:flex-col md:border-0 md:p-0"
    >
      {destinations.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-3 text-xs font-medium transition-colors md:flex-row md:justify-start md:gap-3 md:text-sm",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )
          }
        >
          <Icon className="size-4.5" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
