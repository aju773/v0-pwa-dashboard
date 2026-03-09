"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, UserCheck, UserX, UserSearch, MoreHorizontal, Mail, ShieldAlert } from "lucide-react"
import { OnboardingModal } from "./onboarding-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface EmployeeRecord {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "on-leave" | "offboarding"
  teamLead: string
  avatar: string
}

const initialDirectory: EmployeeRecord[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.m@workspace.com",
    role: "Team Lead",
    department: "Cybersecurity",
    status: "active",
    teamLead: "Direct to Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamLead",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@workspace.com",
    role: "SecOps Engineer",
    department: "Cybersecurity",
    status: "on-leave",
    teamLead: "Alex Morgan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan.l@workspace.com",
    role: "Backend Developer",
    department: "Engineering",
    status: "active",
    teamLead: "David Wallace",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.r@workspace.com",
    role: "UX Designer",
    department: "Design",
    status: "active",
    teamLead: "David Wallace",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "5",
    name: "Marcus Thompson",
    email: "marcus.t@workspace.com",
    role: "Cloud Architect",
    department: "Engineering",
    status: "offboarding",
    teamLead: "David Wallace",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
]

export function HRDirectory() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>(initialDirectory)
  const [searchQuery, setSearchQuery] = useState("")
  const [onboardModalOpen, setOnboardModalOpen] = useState(false)

  const handleOnboardNewHire = (data: any) => {
    const newEmployee: EmployeeRecord = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role === "Employee" ? "Staff" : data.role,
      department: data.department.charAt(0).toUpperCase() + data.department.slice(1),
      status: "active",
      teamLead: data.teamLead === "alex" ? "Alex Morgan" : "Unknown",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`,
    }
    setEmployees([newEmployee, ...employees])
    setOnboardModalOpen(false)
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeCount = employees.filter((e) => e.status === "active").length
  const leaveCount = employees.filter((e) => e.status === "on-leave").length
  const offboardingCount = employees.filter((e) => e.status === "offboarding").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Employee Directory
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage company-wide personnel, onboarding, and access rights.
          </p>
        </div>
        <Button
          onClick={() => setOnboardModalOpen(true)}
          className="w-fit rounded-full px-5 shadow-sm"
        >
          <Plus className="mr-2 size-4" />
          Onboard New Hire
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-0 shadow-md ring-1 ring-border/40 bg-gradient-to-br from-card to-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10">
              <UserCheck className="size-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Headcount</p>
              <p className="text-2xl font-semibold text-foreground">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md ring-1 ring-border/40">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/10">
              <UserSearch className="size-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">On Leave</p>
              <p className="text-2xl font-semibold text-foreground">{leaveCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md ring-1 ring-border/40">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10">
              <UserX className="size-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Offboarding</p>
              <p className="text-2xl font-semibold text-foreground">{offboardingCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Directory Table */}
      <Card className="border-0 shadow-md ring-1 ring-border/40">
        <div className="p-4 border-b border-border/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-full bg-muted/50 border-transparent pl-9 text-sm focus-visible:ring-primary focus:border-primary focus:bg-background transition-colors"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] pl-6">Profile</TableHead>
                <TableHead>Department & Role</TableHead>
                <TableHead>Reporting To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="group">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 ring-2 ring-background shadow-sm">
                        <AvatarImage src={emp.avatar} alt={emp.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {emp.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="size-3" />
                          {emp.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{emp.department}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{emp.teamLead}</span>
                  </TableCell>
                  <TableCell>
                    {emp.status === "active" && (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        Active
                      </Badge>
                    )}
                    {emp.status === "on-leave" && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        On Leave
                      </Badge>
                    )}
                    {emp.status === "offboarding" && (
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                        Offboarding
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-muted">
                          <MoreHorizontal className="size-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
                        <DropdownMenuLabel>Manage Profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Mail className="size-4 text-muted-foreground" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <ShieldAlert className="size-4 text-muted-foreground" /> Revoke Access
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                          <UserX className="size-4" /> Start Offboarding
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <p className="text-sm text-muted-foreground">No employees found matching that search.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OnboardingModal
        open={onboardModalOpen}
        onOpenChange={setOnboardModalOpen}
        onConfirm={handleOnboardNewHire}
      />
    </div>
  )
}
