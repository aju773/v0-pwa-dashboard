"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sun, Clock, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function MorningGate() {
  const [tasks, setTasks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClockIn, setIsClockIn] = useState(false)

  const handleSubmit = async () => {
    if (!tasks.trim()) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsClockIn(true)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  if (isClockIn) {
    return (
      <Card className="border-success/30 bg-gradient-to-br from-success/5 to-success/10">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-success/20">
            <Sparkles className="size-6 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">You&apos;re all set!</h3>
            <p className="text-sm text-muted-foreground">
              Clocked in at {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}. Have a productive day!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <Sun className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{getGreeting()}!</CardTitle>
            <CardDescription className="text-sm">
              What are your top 3 tasks today?
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="1. Review code for Project Alpha&#10;2. Conduct team standup meeting&#10;3. Complete quarterly report draft"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          className="min-h-28 resize-none rounded-xl border-input bg-card text-sm focus:border-primary"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            <span>Start your day strong</span>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!tasks.trim() || isSubmitting}
            className="rounded-full px-6 font-medium shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                <span>Submitting...</span>
              </>
            ) : (
              "Clock In & Submit"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
