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
import { Sunrise, Sunset } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type CheckInType = "morning" | "evening"

interface DailyCheckInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: CheckInType
  onSubmit: (data: any) => void
}

export function DailyCheckInModal({
  open,
  onOpenChange,
  type,
  onSubmit,
}: DailyCheckInModalProps) {
  const [project, setProject] = useState("")
  const [taskTag, setTaskTag] = useState("")
  const [statusTag, setStatusTag] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isMorning = type === "morning"

  const handleSubmit = async () => {
    if (!project || !taskTag || (isMorning ? false : !statusTag) || !notes.trim()) return
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    onSubmit({
      type,
      project,
      taskTag,
      statusTag: isMorning ? "Active" : statusTag,
      notes,
      timestamp: new Date().toISOString()
    })
    
    setIsSubmitting(false)
    setProject("")
    setTaskTag("")
    setStatusTag("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-xl ring-1 ring-border/50">
        
        {/* Dynamic Header based on Type */}
        <div className={`px-6 py-8 flex flex-col items-center justify-center text-center relative overflow-hidden ${
          isMorning 
            ? "bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-900/10" 
            : "bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 dark:from-indigo-500/20 dark:to-indigo-900/10"
        }`}>
          {/* Decorative background shapes */}
          <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 ${isMorning ? 'bg-blue-500' : 'bg-indigo-500'}`} />
          <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 ${isMorning ? 'bg-amber-500' : 'bg-purple-500'}`} />
          
          <div className={`mb-4 flex size-14 items-center justify-center rounded-2xl shadow-sm ring-1 relative z-10 ${
            isMorning 
              ? "bg-blue-500/10 text-blue-600 ring-blue-500/20" 
              : "bg-indigo-500/10 text-indigo-600 ring-indigo-500/20"
          }`}>
            {isMorning ? <Sunrise className="size-7" /> : <Sunset className="size-7" />}
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground relative z-10">
            {isMorning ? "Morning Check-In" : "Evening Handover"}
          </DialogTitle>
          <DialogDescription className="text-sm mt-2 relative z-10 max-w-sm mx-auto">
            {isMorning 
              ? "Declare your primary focus for the day to keep the team aligned." 
              : "Log your daily progress and flag any blockers before logging off."}
          </DialogDescription>
        </div>

        {/* Structured Form */}
        <div className="p-6 space-y-6 bg-card">
          
          {/* 1. Project Dropdown */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">1</span>
              Select Project
            </label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="w-full h-11 bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors">
                <SelectValue placeholder="Which project are you working on?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MyCiso">MyCiso Pentest</SelectItem>
                <SelectItem value="Acme Audit">Client Audit: Acme Corp</SelectItem>
                <SelectItem value="Internal Infra">Internal Infra Hardening</SelectItem>
                <SelectItem value="Avanzo Dashboard">Avanzo Dashboard UI</SelectItem>
                <SelectItem value="Other">Other / Misc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. Task Type Tags */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">2</span>
              Task Focus
            </label>
            <ToggleGroup 
              type="single" 
              value={taskTag} 
              onValueChange={setTaskTag}
              className="justify-start flex-wrap gap-2"
            >
              <ToggleGroupItem value="Feature" className="rounded-full px-4 text-xs font-medium border border-border/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-transparent">
                Feature Work
              </ToggleGroupItem>
              <ToggleGroupItem value="Bugfix" className="rounded-full px-4 text-xs font-medium border border-border/50 data-[state=on]:bg-amber-500 data-[state=on]:text-amber-950 data-[state=on]:border-transparent">
                Bugfix
              </ToggleGroupItem>
              <ToggleGroupItem value="Review" className="rounded-full px-4 text-xs font-medium border border-border/50 data-[state=on]:bg-blue-500 data-[state=on]:text-blue-950 data-[state=on]:border-transparent">
                Code Review / QA
              </ToggleGroupItem>
              <ToggleGroupItem value="Meeting" className="rounded-full px-4 text-xs font-medium border border-border/50 data-[state=on]:bg-purple-500 data-[state=on]:text-purple-950 data-[state=on]:border-transparent">
                Meetings
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* 2.5 Status Tag (Only for Evening) */}
          {!isMorning && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">3</span>
                End of Day Status
              </label>
              <ToggleGroup 
                type="single" 
                value={statusTag} 
                onValueChange={setStatusTag}
                className="justify-start flex-wrap gap-2"
              >
                <ToggleGroupItem value="Productive" className="rounded-full px-4 text-xs font-medium border border-emerald-500/20 data-[state=on]:bg-emerald-500 data-[state=on]:text-emerald-950 data-[state=on]:border-transparent hover:bg-emerald-500/10">
                  Productive
                </ToggleGroupItem>
                <ToggleGroupItem value="Blocked" className="rounded-full px-4 text-xs font-medium border border-destructive/20 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground data-[state=on]:border-transparent hover:bg-destructive/10">
                  Blocked
                </ToggleGroupItem>
                <ToggleGroupItem value="Overworked" className="rounded-full px-4 text-xs font-medium border border-amber-500/20 data-[state=on]:bg-amber-500 data-[state=on]:text-amber-950 data-[state=on]:border-transparent hover:bg-amber-500/10">
                  Overworked
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}

          {/* 3 or 4. Short Text Box */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">{isMorning ? '3' : '4'}</span>
              Notes
            </label>
            <Textarea
              placeholder={isMorning ? "What's the plan? (e.g., Working on the new auth endpoint...)" : "What did you accomplish? (e.g., Merged the auth endpoint, but pipeline failed...)"}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none font-mono text-sm bg-muted/30 border-border/50 focus-visible:ring-primary/50 min-h-[100px]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border/40 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!project || !taskTag || (isMorning ? false : !statusTag) || !notes.trim() || isSubmitting}
            className={`rounded-full px-8 shadow-sm ${
              isMorning 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isSubmitting ? "Submitting..." : (isMorning ? "Submit Check-In" : "Submit Handover")}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
