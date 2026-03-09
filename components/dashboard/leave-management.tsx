"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Check, X, Clock, Users, Calendar, TrendingUp, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "./role-context"

type LeaveStatus = "pending_lead" | "pending_hr" | "pending_admin" | "approved" | "rejected"
type LeaveType = "Full Day" | "Half Day"

interface LeaveRequest {
  id: string
  employeeName: string
  employeeAvatar: string
  department: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  status: LeaveStatus
  reason?: string
}

const statusConfig: Record<
  LeaveStatus,
  { label: string; className: string }
> = {
  pending_lead: {
    label: "Pending Team Lead",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  pending_hr: {
    label: "Pending HR",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  pending_admin: {
    label: "Pending Admin > 5 Days",
    className: "bg-violet-100 text-violet-800 border-violet-200",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 border-red-200",
  },
}

const pendingLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "John Smith",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    department: "Engineering",
    leaveType: "Full Day",
    startDate: "Dec 20, 2026",
    endDate: "Dec 24, 2026",
    status: "pending_lead",
    reason: "Annual family vacation",
  },
  {
    id: "2",
    employeeName: "Emily Chen",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    department: "Design",
    leaveType: "Half Day",
    startDate: "Dec 15, 2026",
    endDate: "Dec 15, 2026",
    status: "pending_lead",
    reason: "Medical appointment",
  },
  {
    id: "3",
    employeeName: "Michael Brown",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    department: "Marketing",
    leaveType: "Full Day",
    startDate: "Dec 18, 2026",
    endDate: "Dec 22, 2026",
    status: "pending_hr",
    reason: "Personal matters",
  },
  {
    id: "4",
    employeeName: "Sarah Johnson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    department: "Cybersecurity",
    leaveType: "Full Day",
    startDate: "Jan 2, 2027",
    endDate: "Jan 10, 2027",
    status: "pending_admin",
    reason: "Extended vacation - 8 days",
  },
  {
    id: "5",
    employeeName: "David Wilson",
    employeeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    department: "Engineering",
    leaveType: "Full Day",
    startDate: "Dec 12, 2026",
    endDate: "Dec 13, 2026",
    status: "approved",
    reason: "Personal day",
  },
]

const companyOverviewData = {
  onLeaveToday: 12,
  pendingRequests: 24,
  approvedThisMonth: 156,
  utilizationRate: 78,
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  trend?: string
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
        {trend && (
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
            {trend}
          </span>
        )}
      </CardContent>
    </Card>
  )
}

export function LeaveManagement() {
  const [activeTab, setActiveTab] = useState("pending")
  const { currentRole } = useRole()

  const handleApprove = (id: string) => {
    // Handle approval logic
    console.log("Approving request:", id)
  }

  const handleReject = (id: string) => {
    // Handle rejection logic
    console.log("Rejecting request:", id)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Leave Approvals & Attendance
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage team leave requests and view attendance overview
          </p>
        </div>
        <Button className="w-fit rounded-full px-5 shadow-sm">
          <Plus className="mr-2 size-4" />
          Apply for Leave
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 h-11 w-full justify-start rounded-xl bg-muted/60 p-1 sm:w-auto">
          {(currentRole === "Team Lead" || currentRole === "Admin" || currentRole === "HR") && (
            <TabsTrigger
              value="pending"
              className="rounded-lg px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Clock className="mr-2 size-4" />
              {currentRole === "HR" || currentRole === "Admin" ? "Tier-2 HR Approvals" : "Pending My Approval"}
            </TabsTrigger>
          )}
          {currentRole === "Employee" && (
            <TabsTrigger
              value="pending"
              className="rounded-lg px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Clock className="mr-2 size-4" />
              My Requests
            </TabsTrigger>
          )}
          <TabsTrigger
            value="overview"
            className="rounded-lg px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Users className="mr-2 size-4" />
            Company Overview
          </TabsTrigger>
        </TabsList>

        {/* Pending Approval Tab */}
        <TabsContent value="pending" className="mt-0">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[250px] pl-6">Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingLeaveRequests.map((request) => (
                    <TableRow key={request.id} className="group">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 ring-2 ring-border">
                            <AvatarImage src={request.employeeAvatar} alt={request.employeeName} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {request.employeeName.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{request.employeeName}</p>
                            {request.reason && (
                              <p className="text-xs text-muted-foreground line-clamp-1 max-w-[180px]">
                                {request.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">{request.department}</span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                            request.leaveType === "Full Day"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-sky-100 text-sky-800 border border-sky-200"
                          )}
                        >
                          {request.leaveType}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{request.startDate}</p>
                          {request.startDate !== request.endDate && (
                            <p className="text-xs text-muted-foreground">to {request.endDate}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={request.status} />
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        {(currentRole === "Team Lead" && request.status === "pending_lead") || 
                         ((currentRole === "HR" || currentRole === "Admin") && request.status === "pending_hr") ? (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                              onClick={() => handleApprove(request.id)}
                            >
                              <Check className="size-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => handleReject(request.id)}
                            >
                              <X className="size-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            {request.status === "approved" ? (
                              <CheckCircle2 className="size-5 text-emerald-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Overview Tab */}
        <TabsContent value="overview" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Users}
              label="On Leave Today"
              value={companyOverviewData.onLeaveToday}
            />
            <StatCard
              icon={Clock}
              label="Pending Requests"
              value={companyOverviewData.pendingRequests}
            />
            <StatCard
              icon={Calendar}
              label="Approved This Month"
              value={companyOverviewData.approvedThisMonth}
            />
            <StatCard
              icon={TrendingUp}
              label="Leave Utilization"
              value={`${companyOverviewData.utilizationRate}%`}
              trend="+5%"
            />
          </div>

          <Card className="mt-6 border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Calendar className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">Company Leave Calendar</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                View team availability and upcoming leave schedules at a glance
              </p>
              <Button variant="outline" className="mt-4 rounded-full">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
