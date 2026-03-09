"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Ticket } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { EmployeeTask } from "./employee-tasks"

interface RaiseBlockerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: EmployeeTask | null
  onConfirm: (taskId: string, description: string) => void
}

export function RaiseBlockerModal({
  open,
  onOpenChange,
  task,
  onConfirm,
}: RaiseBlockerModalProps) {
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!task || !description.trim()) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onConfirm(task.id, description)
    setIsSubmitting(false)
    setDescription("")
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <Ticket className="size-6 text-destructive" />
          </div>
          <DialogTitle className="text-center text-xl">Raise a Blocker</DialogTitle>
          <DialogDescription className="text-center">
            You are flagging an issue for the task: <strong>{task.description}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
              <div>
                <h4 className="text-sm font-semibold text-destructive">
                  This will escalate to your Team Lead
                </h4>
                <p className="mt-1 text-xs text-destructive/80">
                  Please provide as much context as possible. Mention the exact error, missing credential, or external dependency blocking your progress.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Blocker Details</label>
            <Textarea
              placeholder="E.g., I cannot deploy to staging because my IAM role lacks s3:PutObject permissions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none border-destructive/20 bg-destructive/5 focus-visible:ring-destructive"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim() || isSubmitting}
            variant="destructive"
            className="rounded-full shadow-md shadow-destructive/20 hover:shadow-lg hover:shadow-destructive/30"
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 size-4" />
                Submitting Ticket...
              </>
            ) : (
              "Submit Blocker Ticket"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
