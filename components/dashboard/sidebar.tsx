"use client"

import Link from "next/link"
import Image from "next/image"
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
  X,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeItem?: string
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CalendarCheck, label: "Attendance & Leaves", href: "/leaves" },
  { icon: Users, label: "Directory", href: "/directory" },
  { icon: Briefcase, label: "CRM & Projects", href: "/crm" },
  { icon: Ticket, label: "Internal Tickets", href: "/tickets" },
]

export function Sidebar({
  collapsed,
  onToggle,
  activeItem = "Dashboard",
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const { currentRole } = useRole()

  const visibleNavItems = navItems.filter((item) => {
    if (currentRole === "Employee") {
      if (
        item.label === "CRM & Projects" ||
        item.label === "Internal Tickets" ||
        item.label === "Directory"
      ) {
        return false
      }
    }

    if (currentRole === "Team Lead") {
      if (item.label === "Directory") {
        return false
      }
    }

    return true
  })

  // On mobile: the sidebar is always "expanded" (w-64) when open, hidden when closed
  // On desktop: normal collapsed/expanded behavior
  const showLabels = mobileOpen || !collapsed

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        // Mobile: slide in/out from left, always full width when open
        mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
        // md+: always visible, sized by collapsed state
        "md:translate-x-0",
        collapsed ? "md:w-20" : "md:w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {showLabels ? (
          <div className="flex items-center gap-3">
            <Image
              src="/photo_2026-03-09_10-01-31.jpg"
              alt="Avanzo Logo"
              width={36}
              height={36}
              className="rounded-xl object-contain bg-white shrink-0"
            />
            <span className="text-lg font-semibold text-sidebar-foreground">Avanzo</span>
          </div>
        ) : (
          <Image
            src="/photo_2026-03-09_10-01-31.jpg"
            alt="Avanzo Logo"
            width={36}
            height={36}
            className="mx-auto rounded-xl object-contain bg-white shrink-0"
          />
        )}

        {/* Mobile close button */}
        {mobileOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0 rounded-full"
            onClick={onMobileClose}
          >
            <X className="size-5" />
          </Button>
        )}
      </div>

      {/* Desktop Toggle Button */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 hidden md:flex size-6 rounded-full border border-border bg-card shadow-md hover:bg-accent"
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {visibleNavItems.map((item) => {
          const isActive = item.label === activeItem
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("size-5 shrink-0", isActive && "text-sidebar-primary")} />
              {showLabels && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3">
        {currentRole === "Admin" && (
          <Link
            href="/settings"
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              activeItem === "Settings"
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Settings className={cn("size-5 shrink-0", activeItem === "Settings" && "text-sidebar-primary")} />
            {showLabels && <span>Settings</span>}
          </Link>
        )}

        {/* User Profile */}
        <div className={cn(
          "mt-3 flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3 transition-all",
          !showLabels && "justify-center"
        )}>
          <Avatar className="size-9 ring-2 ring-primary/20">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentRole}`} alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold uppercase">
              {currentRole.substring(0, 3)}
            </AvatarFallback>
          </Avatar>
          {showLabels && (
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
