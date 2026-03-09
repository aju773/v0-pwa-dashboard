"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TeamGrid } from "@/components/dashboard/team-grid"
import { EmployeeTasks } from "@/components/dashboard/employee-tasks"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { useRole } from "@/components/dashboard/role-context"

export default function Home() {
  const { currentRole } = useRole()

  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="space-y-8">
        {currentRole === "Team Lead" ? (
          <>
            <EmployeeTasks />
            <div className="pt-8 border-t border-border/50">
              <TeamGrid />
            </div>
          </>
        ) : currentRole === "Employee" ? (
          <EmployeeTasks />
        ) : currentRole === "Admin" ? (
          <AdminDashboard />
        ) : (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            Select a role from the Topbar to preview the dashboard view.
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
