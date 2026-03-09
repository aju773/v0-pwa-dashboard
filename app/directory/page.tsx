import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { HRDirectory } from "@/components/dashboard/hr-directory"

export default function DirectoryPage() {
  return (
    <DashboardLayout activeItem="Directory">
      <HRDirectory />
    </DashboardLayout>
  )
}
