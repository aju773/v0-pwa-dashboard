"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: "active" | "on-leave" | "pending"
  leaveType?: string
  tasks?: string[]
}

interface TeamMemberCardProps {
  member: TeamMember
  onAssignTask?: (memberId: string) => void
}

export function TeamMemberCard({ member, onAssignTask }: TeamMemberCardProps) {
  const isOnLeave = member.status === "on-leave"
  const isPending = member.status === "pending"
  const isActive = member.status === "active"

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-md",
        isOnLeave && "border-destructive/30 bg-destructive/5",
        isPending && "border-warning/30 bg-warning/5",
        isActive && "border-success/30"
      )}
    >
      {/* Status Badge */}
      {isOnLeave && (
        <div className="absolute right-3 top-3">
          <Badge 
            variant="destructive" 
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          >
            <span>⛔</span>
            <span>On Leave: {member.leaveType}</span>
          </Badge>
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="size-12 ring-2 ring-border">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            {/* Name & Role */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
              {isActive && (
                <CheckCircle2 className="size-4 text-success shrink-0" />
              )}
              {isPending && (
                <Clock className="size-4 text-warning shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{member.role}</p>

            {/* Tasks */}
            {member.tasks && member.tasks.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {member.tasks.slice(0, 3).map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span className="line-clamp-1">{task}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Pending State */}
            {isPending && (
              <p className="mt-3 text-xs text-warning italic">
                Hasn&apos;t submitted morning tasks yet
              </p>
            )}

            {/* On Leave with Assign Button */}
            {isOnLeave && onAssignTask && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAssignTask(member.id)}
                  className="h-8 rounded-full border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <AlertTriangle className="size-3.5" />
                  <span>Assign Urgent Task</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
