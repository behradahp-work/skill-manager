//---------- React ----------
import type { ComponentProps } from "react"

//---------- Packages ----------
import { PanelLeftIcon } from "lucide-react"

//---------- Components ----------
import { Button } from "@/shared/components/ui/button"

//---------- Hooks ----------
import { useSidebar } from "./sidebar-context"

export function SidebarTrigger({
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { isMobile, open, openMobile, toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      aria-expanded={isMobile ? openMobile : open}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon aria-hidden="true" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}
