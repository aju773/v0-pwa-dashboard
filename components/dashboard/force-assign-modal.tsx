"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, CalendarOff, Shield } from "lucide-react"
import type { TeamMember } from "./team-member-card"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

interface ForceAssignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: TeamMember | null
  onConfirm: () => void
}

export function ForceAssignModal({
  open,
  onOpenChange,
  member,
  onConfirm,
}: ForceAssignModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onConfirm()
  }

  if (!member) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border-border bg-card p-0 overflow-hidden shadow-2xl">
        {/* Warning Banner */}
        <div className="flex items-center gap-3 bg-destructive/10 px-6 py-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-destructive/20">
            <AlertTriangle className="size-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-destructive">Override Leave Status</h3>
            <p className="text-xs text-destructive/80">This action requires confirmation</p>
          </div>
        </div>

        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-foreground">
            Force Task Assignment
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            You are about to assign a task to someone who is on approved leave. This will notify them immediately.
          </DialogDescription>
        </DialogHeader>

        {/* Employee Info */}
        <div className="mx-6 mt-4 flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4">
          <Avatar className="size-12 ring-2 ring-destructive/30">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-destructive/10 text-destructive font-medium">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
            <CalendarOff className="size-3.5" />
            <span>{member.leaveType}</span>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mx-6 mt-4 flex items-start gap-3 rounded-xl bg-warning/10 p-4">
          <Shield className="mt-0.5 size-5 shrink-0 text-warning" />
          <p className="text-sm text-warning leading-relaxed">
            <strong>Warning:</strong> This user is on approved leave today. Are you sure you want to force an assignment?
          </p>
        </div>

        <DialogFooter className="px-6 py-5 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 rounded-full px-6"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="h-10 rounded-full px-6 shadow-md shadow-destructive/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="size-4" />
                <span>Assigning...</span>
              </>
            ) : (
              "Force Assign"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
