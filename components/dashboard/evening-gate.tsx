"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Moon, Clock, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function EveningGate() {
  const [accomplishments, setAccomplishments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClockOut, setIsClockOut] = useState(false)

  const handleSubmit = async () => {
    if (!accomplishments.trim()) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsClockOut(true)
  }

  if (isClockOut) {
    return (
      <Card className="border-muted bg-muted/30">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <Moon className="size-7 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">You are clocked out</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Great work today! Your accomplishments have been logged and shared with your Team Lead. Rest well!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-transparent to-rose-500/5">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/10">
            <Moon className="size-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Time to clock out!</CardTitle>
            <CardDescription className="text-sm">
              What did you accomplish today?
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="1. Completed the API integration for the dashboard&#10;2. Fixed the layout bugs on mobile&#10;3. Conducted user testing prep"
          value={accomplishments}
          onChange={(e) => setAccomplishments(e.target.value)}
          className="min-h-28 resize-none rounded-xl border-input bg-card text-sm focus:border-orange-500"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            <span>Evening Gate</span>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!accomplishments.trim() || isSubmitting}
            className="rounded-full bg-orange-600 px-6 font-medium text-white shadow-md shadow-orange-600/20 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/30"
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-4" />
                <span>Logging off...</span>
              </>
            ) : (
              "Submit & Clock Out"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
