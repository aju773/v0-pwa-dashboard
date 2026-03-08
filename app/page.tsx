"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { LeaveManagement } from "@/components/dashboard/leave-management"

export default function LeavesPage() {
  return (
    <DashboardLayout activeItem="Attendance & Leaves">
      <LeaveManagement />
    </DashboardLayout>
  )
}
