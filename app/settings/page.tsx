import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AdminSettings } from "@/components/dashboard/admin-settings"

export default function SettingsPage() {
  return (
    <DashboardLayout activeItem="Settings">
      <AdminSettings />
    </DashboardLayout>
  )
}
