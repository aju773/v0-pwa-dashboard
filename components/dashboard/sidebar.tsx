"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  CalendarCheck,
  Briefcase,
  Ticket,
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
  { icon: Briefcase, label: "CRM & Projects", href: "/crm" },
  { icon: Ticket, label: "Internal Tickets", href: "/tickets" },
]

export function Sidebar({ collapsed, onToggle, activeItem = "Dashboard" }: SidebarProps) {
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
        {navItems.map((item) => {
          const isActive = item.label === activeItem
          return (
            <a
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
            </a>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3">
        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Settings className="size-5 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </a>

        {/* User Profile */}
        <div className={cn(
          "mt-3 flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3 transition-all",
          collapsed && "justify-center"
        )}>
          <Avatar className="size-9 ring-2 ring-primary/20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=TeamLead" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">TL</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Alex Morgan</p>
              <p className="truncate text-xs text-muted-foreground">Team Lead</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
