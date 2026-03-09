"use client"

import { useState } from "react"
import { TeamMemberCard, type TeamMember } from "./team-member-card"
import { ForceAssignModal } from "./force-assign-modal"
import { Users } from "lucide-react"

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Cybersecurity",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "on-leave",
    leaveType: "Half-Day",
  },
  {
    id: "2",
    name: "Marcus Thompson",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    status: "active",
    tasks: [
      "Complete API integration for dashboard",
      "Review pull requests from junior devs",
      "Update documentation for v2.0",
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    status: "active",
    tasks: [
      "Finalize mobile wireframes",
      "User testing session at 2 PM",
      "Design system component review",
    ],
  },
  {
    id: "4",
    name: "James Wilson",
    role: "DevOps Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    status: "pending",
  },
  {
    id: "5",
    name: "Aisha Patel",
    role: "Data Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    status: "active",
    tasks: [
      "Q1 performance metrics report",
      "Dashboard KPI updates",
      "Team velocity analysis",
    ],
  },
  {
    id: "6",
    name: "David Kim",
    role: "QA Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    status: "active",
    tasks: [
      "Regression testing for release 3.1",
      "Automate test cases for checkout flow",
      "Bug triage meeting at 11 AM",
    ],
  },
]

export function TeamGrid() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [assignedTasks, setAssignedTasks] = useState<string[]>([])

  const handleAssignTask = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId)
    if (member) {
      setSelectedMember(member)
      setModalOpen(true)
    }
  }

  const handleConfirmAssign = () => {
    if (selectedMember) {
      setAssignedTasks([...assignedTasks, selectedMember.id])
    }
    setModalOpen(false)
  }

  const activeCount = teamMembers.filter((m) => m.status === "active").length
  const pendingCount = teamMembers.filter((m) => m.status === "pending").length
  const onLeaveCount = teamMembers.filter((m) => m.status === "on-leave").length

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-primary/10">
            <Users className="size-4.5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Team Overview</h2>
            <p className="text-sm text-muted-foreground">Daily standup & assignments</p>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
            <span className="size-1.5 rounded-full bg-success" />
            {activeCount} Active
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning">
            <span className="size-1.5 rounded-full bg-warning" />
            {pendingCount} Pending
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
            <span className="size-1.5 rounded-full bg-destructive" />
            {onLeaveCount} On Leave
          </span>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={{
              ...member,
              // If task was force-assigned, show visual feedback
              tasks: assignedTasks.includes(member.id)
                ? ["[URGENT] Assigned during leave"]
                : member.tasks,
            }}
            onAssignTask={
              member.status === "on-leave" && !assignedTasks.includes(member.id)
                ? handleAssignTask
                : undefined
            }
          />
        ))}
      </div>

      {/* Force Assign Modal */}
      <ForceAssignModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        member={selectedMember}
        onConfirm={handleConfirmAssign}
      />
    </div>
  )
}
