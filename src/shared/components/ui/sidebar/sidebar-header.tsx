//---------- React ----------
import type { ComponentProps } from "react"

//---------- Utilities ----------
import { cn } from "@/shared/lib/utils"

export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}
