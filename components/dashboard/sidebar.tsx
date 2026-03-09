"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRole } from "./role-context"
import {
  LayoutDashboard,
  CalendarCheck,
  Briefcase,
  Ticket,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeItem?: string
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CalendarCheck, label: "Attendance & Leaves", href: "/leaves" },
  { icon: Users, label: "Directory", href: "/directory" },
  { icon: Briefcase, label: "CRM & Projects", href: "/crm" },
  { icon: Ticket, label: "Internal Tickets", href: "/tickets" },
]

export function Sidebar({ collapsed, onToggle, activeItem = "Dashboard" }: SidebarProps) {
  const { currentRole } = useRole()

  const visibleNavItems = navItems.filter((item) => {
    if (currentRole === "Employee") {
      // Employees don't see the global CRM, Internal Tickets manager, or Directory
      if (
        item.label === "CRM & Projects" ||
        item.label === "Internal Tickets" ||
        item.label === "Directory"
      ) {
        return false
      }
    }
    
    if (currentRole === "Team Lead") {
      // Team Leads don't see the HR Directory
      if (item.label === "Directory") {
        return false
      }
    }

    return true
  })

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-sm font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Workspace</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex size-9 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-primary-foreground">W</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 size-6 rounded-full border border-border bg-card shadow-md hover:bg-accent"
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {visibleNavItems.map((item) => {
          const isActive = item.label === activeItem
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("size-5 shrink-0", isActive && "text-sidebar-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3">
        {currentRole === "Admin" && (
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              activeItem === "Settings"
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Settings className={cn("size-5 shrink-0", activeItem === "Settings" && "text-sidebar-primary")} />
            {!collapsed && <span>Settings</span>}
          </Link>
        )}

        {/* User Profile */}
        <div className={cn(
          "mt-3 flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3 transition-all",
          collapsed && "justify-center"
        )}>
          <Avatar className="size-9 ring-2 ring-primary/20">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentRole}`} alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold uppercase">
              {currentRole.substring(0, 3)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {currentRole === "Employee" && "John Doe"}
                {currentRole === "Team Lead" && "Alex Morgan"}
                {currentRole === "HR" && "Maria Garcia"}
                {currentRole === "Admin" && "SuperUser"}
              </p>
              <p className="truncate text-xs text-muted-foreground">{currentRole}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
