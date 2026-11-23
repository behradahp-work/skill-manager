//---------- Packages ----------
import { Layers3 } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

//---------- Components ----------
import AppNavigation from "@/app/layout/app-navigation";

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-background md:grid md:grid-cols-[14rem_minmax(0,1fr)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <header className="border-b bg-card px-5 py-4 md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:gap-10 md:border-r md:border-b-0 md:px-4 md:py-7">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-3 rounded-lg pr-2 text-sm font-semibold tracking-tight md:px-2"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Layers3 className="size-5" aria-hidden="true" />
          </span>
          Skill Manager
        </Link>
        <AppNavigation />
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:px-8 md:px-10 md:pt-14 md:pb-14 lg:px-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
