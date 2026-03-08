import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { InternalTickets } from "@/components/dashboard/internal-tickets"

export default function Home() {
  return (
    <DashboardLayout activeItem="Internal Tickets">
      <InternalTickets />
    </DashboardLayout>
  )
}
