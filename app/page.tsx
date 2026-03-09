"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MorningGate } from "@/components/dashboard/morning-gate"
import { TeamGrid } from "@/components/dashboard/team-grid"
import { EmployeeTasks } from "@/components/dashboard/employee-tasks"
import { EveningGate } from "@/components/dashboard/evening-gate"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { useRole } from "@/components/dashboard/role-context"

export default function Home() {
  const { currentRole } = useRole()

  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="space-y-8">
        {currentRole === "Team Lead" ? (
          <>
            <MorningGate />
            <TeamGrid />
          </>
        ) : currentRole === "Employee" ? (
          <>
            <EmployeeTasks />
            <div className="pt-8 border-t border-border/50">
              <EveningGate />
            </div>
          </>
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
