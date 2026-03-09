import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CRMProjects } from "@/components/dashboard/crm-projects"

export default function CRMPage() {
  return (
    <DashboardLayout activeItem="CRM & Projects">
      <CRMProjects />
    </DashboardLayout>
  )
}
