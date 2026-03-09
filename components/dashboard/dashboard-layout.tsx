"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeItem?: string
}

export function DashboardLayout({ children, activeItem = "Dashboard" }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
        setMobileOpen(false)
      } else if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-muted/40 relative">
      {/* Subtle background grid pattern (matches Login page) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:80px_80px] opacity-[0.15] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:80px_80px] opacity-[0.15] pointer-events-none" />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Topbar
        sidebarCollapsed={sidebarCollapsed}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
      />
      <main
        className={cn(
          "relative z-10 min-h-screen pt-16 transition-all duration-300",
          "pl-0 md:pl-20",
          !sidebarCollapsed && "lg:pl-64"
        )}
      >
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
