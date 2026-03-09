"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldAlert, ArrowRight, UserCheck, CheckCircle2, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { tickets } from "./internal-tickets"

export function AdminDashboard() {
  const escalatedTickets = tickets.filter(t => t.status === "unresolved" && t.severity === "high")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Admin Command Center</h2>
          <p className="text-sm text-muted-foreground">System overview & high-priority escalations</p>
        </div>
      </div>

      {/* Tier 3 Escalation Widget */}
      <Card className="border-0 shadow-md ring-1 ring-destructive/10 bg-gradient-to-br from-destructive/5 to-transparent relative overflow-hidden mb-6">
        {/* Decorative corner stripe */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-bl-full -z-10 translate-x-12 -translate-y-12" />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-destructive/20">
                <ShieldAlert className="size-4 text-destructive" />
              </div>
              <h3 className="text-base font-semibold text-destructive">High-Risk Escalated Blockers</h3>
            </div>
            <span className="text-sm font-medium text-destructive">{escalatedTickets.length} Critical Issues</span>
          </div>
        </CardHeader>
        <CardContent className="pt-2 space-y-3">
          {escalatedTickets.length === 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm">
              <CheckCircle2 className="mx-auto size-8 text-emerald-500 mb-2" />
              <p className="font-medium text-emerald-800">Clear Skies</p>
              <p className="text-sm text-emerald-600">No high-risk escalations require your attention right now.</p>
            </div>
          ) : (
            escalatedTickets.map(ticket => (
              <div key={ticket.id} className="rounded-xl border border-destructive/20 bg-card p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-destructive/5">
                
                <div className="flex items-start md:items-center gap-4">
                  <Avatar className="size-10 ring-2 ring-destructive/30 shrink-0 mt-1 md:mt-0">
                    <AvatarImage src={ticket.raisedBy.avatar} alt={ticket.raisedBy.name} />
                    <AvatarFallback className="bg-destructive/10 text-destructive font-medium text-xs">
                      {ticket.raisedBy.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground flex flex-wrap items-center gap-2 text-sm md:text-base">
                      {ticket.title}
                      <span className="inline-flex rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold tracking-widest text-rose-700 uppercase">
                        Severity: {ticket.severity}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 max-w-[500px] truncate">{ticket.description}</p>
                    <div className="mt-2 text-xs flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground/80">
                      <span className="flex items-center gap-1 font-medium text-foreground"><UserCheck className="size-3 text-muted-foreground" /> {ticket.raisedBy.name}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {ticket.timestamp}</span>
                      <span className="flex items-center gap-1">Client: {ticket.linkedClient}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:border-l md:border-border md:pl-6 shrink-0 mt-2 md:mt-0">
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <Button variant="default" size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full h-9">
                      Review & Resolve <ArrowRight className="ml-2 size-3.5" />
                    </Button>
                  </div>
                </div>

              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* The Daily Pulse Module (Material Design 3) */}
      <h3 className="text-xl font-semibold tracking-tight text-foreground mt-8 mb-4">The Daily Pulse</h3>
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Morning Check-in Pulse */}
        <Card className="border-0 shadow-md ring-1 ring-border/50 bg-card overflow-hidden flex flex-col transition-all hover:shadow-lg">
          <CardHeader className="pb-4 border-b border-border/40 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
                  <UserCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Morning Check-ins</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Recorded Today by 10:00 AM</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold tracking-tighter text-foreground">
                  34<span className="text-muted-foreground text-[0.55em] font-medium ml-0.5">/37</span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col gap-8">
            {/* Status Bar */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-foreground tracking-tight">Fleet Online Status</span>
                <span className="text-sm text-blue-600 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-full ring-1 ring-blue-500/20">
                  92% Active
                </span>
              </div>
              <div className="h-4 w-full bg-muted/50 rounded-full overflow-hidden flex p-0.5 ring-1 ring-border/40 inset-shadow-sm">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-sm" style={{ width: '92%' }} />
              </div>
            </div>

            {/* Focus Allocation */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Today's Focus Allocation</h4>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center justify-between text-sm mb-1.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/20" />
                      <span className="font-medium text-foreground/90">AWS Migration <span className="text-muted-foreground font-normal ml-1">(Eng)</span></span>
                    </div>
                    <span className="font-semibold tabular-nums">45%</span>
                  </div>
                  <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                     <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between text-sm mb-1.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-500/20" />
                      <span className="font-medium text-foreground/90">TechStart UI <span className="text-muted-foreground font-normal ml-1">(Design & Eng)</span></span>
                    </div>
                    <span className="font-semibold tabular-nums">35%</span>
                  </div>
                   <div className="h-1.5 w-full bg-amber-500/10 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between text-sm mb-1.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                      <span className="font-medium text-foreground/90">Internal Ops & HR</span>
                    </div>
                    <span className="font-semibold tabular-nums">20%</span>
                  </div>
                   <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evening EOD Summary */}
        <Card className="border-0 shadow-md ring-1 ring-border/50 bg-card overflow-hidden flex flex-col transition-all hover:shadow-lg">
          <CardHeader className="pb-4 border-b border-border/40 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Evening Handover</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Aggregated Summary (Yesterday)</p>
                </div>
              </div>
              <div className="flex -space-x-2.5">
                <Avatar className="size-9 ring-2 ring-background shadow-xs"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" /></Avatar>
                <Avatar className="size-9 ring-2 ring-background shadow-xs"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" /></Avatar>
                <Avatar className="size-9 ring-2 ring-background shadow-xs"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" /></Avatar>
                <div className="size-9 rounded-full ring-2 ring-background bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground shadow-xs z-10">+31</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col gap-6">
            
            {/* AI Briefing Segment */}
            <div className="relative rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/10 border border-emerald-200/60 dark:border-emerald-800/40 p-5 shadow-sm">
              <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                 <CheckCircle2 className="size-16 text-emerald-600" />
              </div>
              <div className="flex gap-3 relative z-10">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  <span className="text-xs font-bold leading-none">AI</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200/90 leading-relaxed">
                    Productivity was high yesterday (88% tasks completed). The only bottleneck is pending approval from the TechStart client. 
                  </p>
                  <p className="text-sm text-emerald-700 font-medium">
                    2 people reported feeling overworked.
                  </p>
                </div>
              </div>
            </div>

            {/* Exceptions Report */}
            <div className="space-y-4">
              <h4 className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Exceptions Report</span>
                <span className="bg-destructive/10 text-destructive px-2.5 py-0.5 rounded-full text-[10px] ring-1 ring-destructive/20 shadow-sm">2 Flags</span>
              </h4>
              
              <div className="grid gap-3">
                {/* Exception 1 */}
                <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar className="size-6 shrink-0">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                        <AvatarFallback>SK</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm text-foreground truncate">Sarah Kim <span className="text-muted-foreground font-normal">(Data Eng)</span></span>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full ring-1 ring-amber-500/20">Overworked</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-8">"Logged 11 hours today fighting the legacy database migration. Needs PM attention."</p>
                </div>
                
                {/* Exception 2 */}
                <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar className="size-6 shrink-0">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm text-foreground truncate">Marcus Chen <span className="text-muted-foreground font-normal">(DevOps)</span></span>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-destructive bg-destructive/10 px-2 py-0.5 rounded-full ring-1 ring-destructive/20">Blocked</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-8">"Still waiting on IAM roles. Second day unable to deploy. Escalating."</p>
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
