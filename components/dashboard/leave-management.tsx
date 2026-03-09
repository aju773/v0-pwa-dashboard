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
    <Card className="border-0 shadow-md ring-1 ring-border/40">
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

  const filteredRequests = currentRole === "Employee" 
    ? pendingLeaveRequests.filter(req => req.employeeName === "John Doe" || req.employeeName.includes("Smith")) // Using Smith as fallback from existing mock data
    : pendingLeaveRequests

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Leave Approvals & Attendance
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {currentRole === "Employee" 
              ? "Manage your leave requests and view team availability" 
              : "Manage team leave requests and view attendance overview"}
          </p>
        </div>
        <Button className="w-fit rounded-full px-5 shadow-md shadow-primary/20">
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
              className="rounded-full px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Clock className="mr-2 size-4" />
              {currentRole === "HR" || currentRole === "Admin" ? "Tier-2 HR Approvals" : "Pending My Approval"}
            </TabsTrigger>
          )}
          {currentRole === "Employee" && (
            <TabsTrigger
              value="pending"
              className="rounded-full px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Clock className="mr-2 size-4" />
              My Requests
            </TabsTrigger>
          )}
          <TabsTrigger
            value="overview"
            className="rounded-full px-5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Calendar className="mr-2 size-4" />
            Company Overview
          </TabsTrigger>
        </TabsList>

        {/* Pending Approval Tab */}
        <TabsContent value="pending" className="mt-0">
          <Card className="border-0 shadow-md ring-1 ring-border/40">
            <CardContent className="p-0">
              {filteredRequests.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[250px] pl-6">Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Leave Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Status</TableHead>
                        {currentRole !== "Employee" && (
                          <TableHead className="pr-6 text-right">Actions</TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
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
                                  : "bg-amber-100 text-amber-800 border border-amber-200"
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
                          
                          {currentRole !== "Employee" && (
                            <TableCell className="pr-6 text-right">
                              {((currentRole === "Team Lead" && request.status === "pending_lead") || 
                               ((currentRole === "HR" || currentRole === "Admin") && request.status === "pending_hr") ||
                               (currentRole === "Admin" && request.status === "pending_admin")) ? (
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
                                  ) : request.status === "rejected" ? (
                                    <X className="size-5 text-destructive" />
                                  ) : (
                                    <span className="text-xs text-muted-foreground">—</span>
                                  )}
                                </div>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="size-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">No pending requests</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You have no active leave requests at the moment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Overview Tab */}
        <TabsContent value="overview" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Users}
              label={currentRole === "Employee" ? "Team on Leave Today" : "Company on Leave Today"}
              value={currentRole === "Employee" ? 2 : companyOverviewData.onLeaveToday}
            />
            {currentRole !== "Employee" && (
              <StatCard
                icon={Clock}
                label="Pending Requests"
                value={companyOverviewData.pendingRequests}
              />
            )}
            <StatCard
              icon={Calendar}
              label={currentRole === "Employee" ? "My Approved Days" : "Approved This Month"}
              value={currentRole === "Employee" ? 14 : companyOverviewData.approvedThisMonth}
            />
            <StatCard
              icon={TrendingUp}
              label={currentRole === "Employee" ? "Leave Balance" : "Leave Utilization"}
              value={currentRole === "Employee" ? "8 Days" : `${companyOverviewData.utilizationRate}%`}
              trend={currentRole === "Employee" ? undefined : "+5%"}
            />
          </div>

          {/* New Example Company/Team Leave Calendar */}
          <Card className="mt-6 border-0 shadow-md ring-1 ring-border/40 overflow-hidden">
            <div className="border-b border-border bg-muted/20 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {currentRole === "Employee" ? "Team Availability Calendar" : "Company Leave Calendar"}
                </h3>
                <p className="text-sm text-muted-foreground">December 2026</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-primary/20"></span>
                  <span className="text-muted-foreground">Full Day Leave</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-amber-200"></span>
                  <span className="text-muted-foreground">Half Day</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Calendar Header (Dates) */}
                  <div className="grid grid-cols-[180px_repeat(14,1fr)] border-b border-border bg-muted/10 text-xs font-medium text-muted-foreground">
                    <div className="p-3 border-r border-border">Team Member</div>
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i} className="p-3 text-center border-r border-border last:border-0">
                        <div className="opacity-70">Dec</div>
                        <div className={cn("text-base font-semibold mt-0.5", (i === 5 || i === 6 || i === 12 || i === 13) ? "text-primary/60" : "text-foreground")}>
                          {i + 14}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Rows */}
                  {[
                    { name: "John Smith", dept: "Engineering", leaves: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0] },
                    { name: "Emily Chen", dept: "Design", leaves: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { name: "Michael Brown", dept: "Marketing", leaves: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { name: "Sarah Johnson", dept: "Cybersecurity", leaves: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { name: "David Wilson", dept: "Engineering", leaves: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1] },
                  ].map((person, index) => (
                    <div key={index} className="grid grid-cols-[180px_repeat(14,1fr)] border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                      <div className="p-3 border-r border-border flex items-center gap-3">
                        <Avatar className="size-7">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name.split(' ')[0]}`} />
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <div className="text-sm font-medium truncate">{person.name}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{person.dept}</div>
                        </div>
                      </div>
                      
                      {person.leaves.map((status, i) => {
                        const isWeekend = i === 5 || i === 6 || i === 12 || i === 13;
                        return (
                          <div key={i} className={cn(
                            "p-2 border-r border-border last:border-0 flex items-center justify-center relative",
                            isWeekend && "bg-muted/20"
                          )}>
                            {status === 1 && (
                              <div className="absolute inset-x-1 top-2 bottom-2 bg-primary/20 rounded-md border border-primary/30" title="Full Day Leave" />
                            )}
                            {status === 2 && (
                               <div className="absolute inset-x-1 top-2 bottom-2 bg-amber-100 rounded-md border border-amber-300" title="Half Day Leave" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
