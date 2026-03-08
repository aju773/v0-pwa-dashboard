"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MorningGate } from "@/components/dashboard/morning-gate"
import { TeamGrid } from "@/components/dashboard/team-grid"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Morning Gate Widget */}
        <MorningGate />

        {/* Team Overview Grid */}
        <TeamGrid />
      </div>
    </DashboardLayout>
  )
}
