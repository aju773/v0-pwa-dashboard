"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Building2,
  UserPlus,
  ChevronDown,
  Search,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateClientModal } from "./create-client-modal"
import { CreateProjectModal } from "./create-project-modal"
import { useRole } from "./role-context"

type ServiceType =
  | "Cybersecurity: Incident Handling"
  | "Cybersecurity: Penetration Testing"
  | "App Development"
  | "Cloud Infrastructure"
  | "Data Analytics"

interface TeamMemberAssignment {
  id: string
  name: string
  role: string
  avatar: string
  isOnLeave?: boolean
  leaveType?: string
}

interface ProjectMilestone {
  name: string
  current: number
  total: number
  percentage: number
}

interface ClientProject {
  id: string
  clientName: string
  serviceType: ServiceType
  projectName: string
  milestone: ProjectMilestone
  assignedTeam: TeamMemberAssignment[]
}

const serviceTypeConfig: Record<ServiceType, { className: string }> = {
  "Cybersecurity: Incident Handling": {
    className: "bg-rose-100 text-rose-800 border-rose-200",
  },
  "Cybersecurity: Penetration Testing": {
    className: "bg-red-100 text-red-800 border-red-200",
  },
  "App Development": {
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  "Cloud Infrastructure": {
    className: "bg-violet-100 text-violet-800 border-violet-200",
  },
  "Data Analytics": {
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
}

const availableTeamMembers: TeamMemberAssignment[] = [
  {
    id: "tm1",
    name: "Alex Rivera",
    role: "Security Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "tm2",
    name: "Jordan Lee",
    role: "Backend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
  },
  {
    id: "tm3",
    name: "Sarah Chen",
    role: "Cybersecurity Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    isOnLeave: true,
    leaveType: "Half-Day",
  },
  {
    id: "tm4",
    name: "Marcus Thompson",
    role: "Cloud Architect",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: "tm5",
    name: "Priya Patel",
    role: "Data Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
  {
    id: "tm6",
    name: "David Kim",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidK",
  },
]

const clientProjects: ClientProject[] = [
  {
    id: "p1",
    clientName: "Acme Corp",
    serviceType: "Cybersecurity: Incident Handling",
    projectName: "Yearly Security Audit",
    milestone: {
      name: "Penetration Testing",
      current: 3,
      total: 12,
      percentage: 25,
    },
    assignedTeam: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Security Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      {
        id: "2",
        name: "Michael Brown",
        role: "Analyst",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      {
        id: "3",
        name: "Emily Chen",
        role: "Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      },
    ],
  },
  {
    id: "p2",
    clientName: "TechStart Inc",
    serviceType: "App Development",
    projectName: "Mobile Banking App v2.0",
    milestone: {
      name: "UI/UX Design Phase",
      current: 7,
      total: 10,
      percentage: 70,
    },
    assignedTeam: [
      {
        id: "4",
        name: "John Smith",
        role: "Tech Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      {
        id: "5",
        name: "Lisa Wang",
        role: "Designer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      },
    ],
  },
  {
    id: "p3",
    clientName: "GlobalBank Ltd",
    serviceType: "Cloud Infrastructure",
    projectName: "AWS Migration",
    milestone: {
      name: "Data Migration",
      current: 5,
      total: 8,
      percentage: 62,
    },
    assignedTeam: [
      {
        id: "6",
        name: "Robert Davis",
        role: "Cloud Architect",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      },
      {
        id: "7",
        name: "Anna Martinez",
        role: "DevOps",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      },
      {
        id: "8",
        name: "Chris Lee",
        role: "Backend Dev",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
      },
      {
        id: "9",
        name: "Maya Patel",
        role: "QA Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      },
    ],
  },
  {
    id: "p4",
    clientName: "HealthCare Plus",
    serviceType: "Data Analytics",
    projectName: "Patient Data Dashboard",
    milestone: {
      name: "Dashboard Development",
      current: 2,
      total: 6,
      percentage: 33,
    },
    assignedTeam: [
      {
        id: "10",
        name: "David Wilson",
        role: "Data Scientist",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
    ],
  },
  {
    id: "p5",
    clientName: "SecureFinance",
    serviceType: "Cybersecurity: Penetration Testing",
    projectName: "Q4 Vulnerability Assessment",
    milestone: {
      name: "External Network Scan",
      current: 1,
      total: 4,
      percentage: 25,
    },
    assignedTeam: [
      {
        id: "11",
        name: "Kevin Zhang",
        role: "Pen Tester",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
      },
      {
        id: "12",
        name: "Rachel Green",
        role: "Security Analyst",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
      },
    ],
  },
]

const serviceFilters: ServiceType[] = [
  "Cybersecurity: Incident Handling",
  "Cybersecurity: Penetration Testing",
  "App Development",
  "Cloud Infrastructure",
  "Data Analytics",
]

function MilestoneProgress({ milestone }: { milestone: ProjectMilestone }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Current Milestone: {milestone.name}
        </span>
        <span className="text-sm text-muted-foreground">
          ({milestone.current} of {milestone.total})
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
          style={{ width: `${milestone.percentage}%` }}
        />
      </div>
      <p className="text-right text-xs text-muted-foreground">
        {milestone.percentage}% complete
      </p>
    </div>
  )
}

function AssignTeamPopover({
  projectId,
  onAssign,
}: {
  projectId: string
  onAssign: (projectId: string, memberId: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredMembers = availableTeamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAssign = (memberId: string) => {
    onAssign(projectId, memberId)
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex size-9 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/50 text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
          aria-label="Assign team member"
        >
          <Plus className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 rounded-2xl border-0 p-0 shadow-lg"
        align="start"
      >
        <div className="p-4">
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Assign Team Member
          </h4>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-muted bg-muted/50 pl-9 text-sm focus-visible:ring-primary"
            />
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto border-t px-2 py-2">
          {filteredMembers.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No team members found
            </p>
          ) : (
            filteredMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleAssign(member.id)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
              >
                <Avatar className="size-9 ring-2 ring-border">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {member.name}
                    </p>
                    {member.isOnLeave && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
                        <span>⛔</span>
                        On Leave: {member.leaveType}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {member.role}
                  </p>
                </div>
                {!member.isOnLeave && (
                  <CheckCircle2 className="size-4 shrink-0 text-muted-foreground/50" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function ProjectCard({
  project,
  onAssignMember,
}: {
  project: ClientProject
  onAssignMember: (projectId: string, memberId: string) => void
}) {
  const serviceConfig = serviceTypeConfig[project.serviceType]
  const { currentRole } = useRole()
  const canModify = currentRole === "Team Lead" || currentRole === "Admin"

  return (
    <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
              <Building2 className="size-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {project.clientName}
              </h3>
              <span
                className={cn(
                  "mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  serviceConfig.className
                )}
              >
                {project.serviceType}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Project Name */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Project
          </p>
          <p className="mt-1 text-base font-medium text-foreground">
            {project.projectName}
          </p>
        </div>

        {/* Milestone Progress */}
        <MilestoneProgress milestone={project.milestone} />

        {/* Assigned Team */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Assigned Team
          </p>
          <div className="flex items-center">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2.5">
              {project.assignedTeam.slice(0, 4).map((member, index) => (
                <Avatar
                  key={member.id}
                  className="size-9 ring-2 ring-card"
                  style={{ zIndex: project.assignedTeam.length - index }}
                >
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.assignedTeam.length > 4 && (
                <div className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-card">
                  +{project.assignedTeam.length - 4}
                </div>
              )}
            </div>

            {/* Assign Button */}
            {canModify && (
              <div className="ml-2">
                <AssignTeamPopover
                  projectId={project.id}
                  onAssign={onAssignMember}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CRMProjects() {
  const [selectedService, setSelectedService] = useState<ServiceType | "all">("all")
  const [projects, setProjects] = useState<ClientProject[]>(clientProjects)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  
  const { currentRole } = useRole()
  const canModify = currentRole === "Team Lead" || currentRole === "Admin"

  const handleAssignMember = (projectId: string, memberId: string) => {
    const member = availableTeamMembers.find(m => m.id === memberId)
    if (!member) return

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        // Avoid duplicate assignments
        if (p.assignedTeam.some(t => t.id === memberId)) return p
        return { ...p, assignedTeam: [...p.assignedTeam, member] }
      }
      return p
    }))
  }

  const handleCreateClient = (clientName: string) => {
    // In a real app this would save to a DB. For now just close the modal.
    setClientModalOpen(false)
  }

  const handleCreateProject = (data: any) => {
    const newProject: ClientProject = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: data.clientName,
      serviceType: data.serviceType as ServiceType,
      projectName: data.projectName,
      milestone: {
        name: data.milestoneName,
        current: 0,
        total: parseInt(data.milestoneTotal, 10) || 10,
        percentage: 0,
      },
      assignedTeam: [],
    }
    setProjects([newProject, ...projects])
    setProjectModalOpen(false)
  }

  const filteredProjects =
    selectedService === "all"
      ? projects
      : projects.filter((p) => p.serviceType === selectedService)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Client Projects & Services
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage client engagements, track milestones, and assign teams
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 rounded-full border-muted bg-card px-4 text-sm shadow-sm"
              >
                <span className="text-muted-foreground">Filter by:</span>
                <span className="ml-1.5 font-medium">
                  {selectedService === "all" ? "All Services" : selectedService}
                </span>
                <ChevronDown className="ml-2 size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-xl border-0 p-2 shadow-lg"
            >
              <DropdownMenuItem
                onClick={() => setSelectedService("all")}
                className="rounded-lg px-3 py-2.5"
              >
                All Services
              </DropdownMenuItem>
              {serviceFilters.map((service) => (
                <DropdownMenuItem
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className="rounded-lg px-3 py-2.5"
                >
                  {service}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Action Buttons */}
          {canModify && (
            <>
              <Button
                variant="outline"
                className="h-10 rounded-full border-muted bg-card px-5 shadow-sm"
                onClick={() => setClientModalOpen(true)}
              >
                <Building2 className="mr-2 size-4" />
                New Client
              </Button>
              <Button 
                className="h-10 rounded-full px-5 shadow-sm"
                onClick={() => setProjectModalOpen(true)}
              >
                <Plus className="mr-2 size-4" />
                Create Project
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onAssignMember={handleAssignMember}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <Building2 className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">
              No projects found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              No projects match the selected filter. Try a different service
              type or create a new project.
            </p>
            {canModify && (
              <Button 
                className="mt-4 rounded-full"
                onClick={() => setProjectModalOpen(true)}
              >
                <Plus className="mr-2 size-4" />
                Create Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <CreateClientModal
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
        onConfirm={handleCreateClient}
      />
      <CreateProjectModal
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
        onConfirm={handleCreateProject}
      />
    </div>
  )
}
