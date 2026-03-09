"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RaiseBlockerModal } from "./raise-blocker-modal"
import { CheckCircle2, Clock, Flag, LayoutGrid, Target, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type TaskStatus = "todo" | "in-progress" | "blocked" | "completed"

export interface EmployeeTask {
  id: string
  clientName: string
  serviceType: string
  projectName: string
  milestone: string
  description: string
  status: TaskStatus
}

const initialTasks: EmployeeTask[] = [
  {
    id: "t1",
    clientName: "Acme Corp",
    serviceType: "Cybersecurity: Incident Handling",
    projectName: "Yearly Security Audit",
    milestone: "Penetration Testing (3 of 12)",
    description: "Scan production external IP ranges for top 10 OWASP vulnerabilities",
    status: "in-progress"
  },
  {
    id: "t2",
    clientName: "TechStart Inc",
    serviceType: "App Development",
    projectName: "Mobile Banking App v2.0",
    milestone: "UI/UX Design Phase (7 of 10)",
    description: "Finalize the biometric authentication flow mockups",
    status: "todo"
  },
  {
    id: "t3",
    clientName: "GlobalBank Ltd",
    serviceType: "Cloud Infrastructure",
    projectName: "AWS Migration",
    milestone: "Data Migration (5 of 8)",
    description: "Migrate legacy user table to Aurora Postgres",
    status: "blocked"
  }
]

const statusConfig: Record<TaskStatus, { label: string; className: string; icon: any }> = {
  todo: {
    label: "To Do",
    className: "bg-muted text-muted-foreground",
    icon: Clock
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Target
  },
  blocked: {
    label: "Blocked",
    className: "bg-destructive/15 text-destructive border-destructive/20",
    icon: Flag
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: CheckCircle2
  }
}

export function EmployeeTasks() {
  const [tasks, setTasks] = useState<EmployeeTask[]>(initialTasks)
  const [blockerModalOpen, setBlockerModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<EmployeeTask | null>(null)

  const handleOpenBlocker = (task: EmployeeTask) => {
    setSelectedTask(task)
    setBlockerModalOpen(true)
  }

  const handleConfirmBlocker = (taskId: string, _description: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "blocked" } : t))
    )
    setBlockerModalOpen(false)
  }

  const handleMarkComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <LayoutGrid className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">My Active Tasks</h2>
            <p className="text-sm text-muted-foreground">Manage your assignments and report blockers</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => {
          const StatusIcon = statusConfig[task.status].icon

          return (
            <Card key={task.id} className={cn(
              "border-l-4 shadow-sm transition-all hover:shadow-md",
              task.status === "blocked" ? "border-l-destructive" :
              task.status === "completed" ? "border-l-emerald-500" :
              task.status === "in-progress" ? "border-l-blue-500" :
              "border-l-muted-foreground/30"
            )}>
              <CardHeader className="pb-3 pt-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{task.clientName}</span>
                  </div>
                  <span className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide",
                    statusConfig[task.status].className
                  )}>
                    <StatusIcon className="size-3" />
                    {statusConfig[task.status].label}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2">
                    <span className="inline-block rounded-md bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {task.projectName}
                    </span>
                  </div>
                  <p className="mb-1 text-xs font-medium text-foreground/80">{task.milestone}</p>
                  <p className="text-sm text-foreground">{task.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {task.status !== "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full border-muted bg-card px-3 text-xs shadow-none hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                      onClick={() => handleMarkComplete(task.id)}
                    >
                      <CheckCircle2 className="mr-1.5 size-3.5" />
                      Mark Done
                    </Button>
                  )}
                  {task.status !== "blocked" && task.status !== "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full border-muted bg-card px-3 text-xs shadow-none text-destructive/80 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                      onClick={() => handleOpenBlocker(task)}
                    >
                      <Flag className="mr-1.5 size-3.5" />
                      Flag Blocker
                    </Button>
                  )}
                  {task.status === "blocked" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 rounded-full bg-destructive/10 text-destructive text-xs hover:bg-destructive/20"
                      onClick={() => handleOpenBlocker(task)}
                    >
                      <Flag className="mr-1.5 size-3.5" />
                      Update Blocker
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <RaiseBlockerModal
        open={blockerModalOpen}
        onOpenChange={setBlockerModalOpen}
        task={selectedTask}
        onConfirm={handleConfirmBlocker}
      />
    </div>
  )
}
