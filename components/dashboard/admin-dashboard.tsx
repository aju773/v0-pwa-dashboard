"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldAlert, ArrowRight, UserCheck, CheckCircle2, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { tickets } from "./internal-tickets"

// At the top of the file, we need useState and ToggleGroup imports
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ScrollArea } from "@/components/ui/scroll-area"

// ... inside the AdminDashboard component:
export function AdminDashboard() {
  const escalatedTickets = tickets.filter(t => t.status === "unresolved" && t.severity === "high")
  const [activeTeam, setActiveTeam] = useState("Cyber Security")

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
              <div key={ticket.id} className="rounded-xl border-0 ring-1 ring-destructive/20 bg-card p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-destructive/5">
                
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

      {/* The Daily Pulse Module (Team Based) */}
      <div className="mt-10 mb-6 border-b border-border/60 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">The Daily Pulse</h3>
            <p className="text-sm text-muted-foreground mt-1">Live operational data sliced by department</p>
          </div>
          
          {/* Department Tabs */}
          <ToggleGroup 
            type="single" 
            value={activeTeam} 
            onValueChange={(value) => value && setActiveTeam(value)}
            className="bg-muted/50 p-1 rounded-full self-start md:self-auto"
          >
            <ToggleGroupItem value="Cyber Security" className="rounded-full px-4 text-xs font-medium data-[state=on]:bg-background data-[state=on]:shadow-sm">
              Cyber Security
            </ToggleGroupItem>
            <ToggleGroupItem value="Engineering" className="rounded-full px-4 text-xs font-medium data-[state=on]:bg-background data-[state=on]:shadow-sm">
              Engineering
            </ToggleGroupItem>
            <ToggleGroupItem value="Design" className="rounded-full px-4 text-xs font-medium data-[state=on]:bg-background data-[state=on]:shadow-sm">
              Design
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Morning Check-in: Active Initiatives */}
        <Card className="border-0 shadow-md ring-1 ring-border/50 bg-card flex flex-col transition-all hover:shadow-lg h-[420px]">
          <CardHeader className="pb-4 border-b border-border/40 bg-muted/10 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20">
                  <UserCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Active Initiatives</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Morning declarations by {activeTeam}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold tracking-tighter text-foreground">
                  {activeTeam === "Cyber Security" ? 14 : activeTeam === "Engineering" ? 18 : 5}
                  <span className="text-muted-foreground text-[0.5em] font-medium ml-1 tracking-normal uppercase">Online</span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                
                {activeTeam === "Cyber Security" ? (
                  <div className="space-y-4">
                    {/* Log 1 */}
                    <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                            <AvatarFallback>AL</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-sm text-foreground truncate">Alex Rivera</span>
                            <span className="block text-xs text-muted-foreground">Today, 8:45 AM</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-md">MyCiso</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">Clear</span>
                        </div>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed pl-10 font-mono text-xs bg-muted/40 p-3 rounded-lg border border-border/50">"Starting the day by reviewing automated test results from overnight. Will spend the afternoon writing the final report section on access controls."</p>
                    </div>

                    {/* Log 2 */}
                    <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />
                      <div className="flex justify-between items-start gap-4 mb-3 pl-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                            <AvatarFallback>SK</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-sm text-foreground truncate">Sarah Kim</span>
                            <span className="block text-xs text-muted-foreground">Today, 9:10 AM</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-md">Acme Audit</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-destructive bg-destructive/10 px-2 py-0.5 rounded-md">Blocked</span>
                        </div>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed pl-10 font-mono text-xs bg-muted/40 p-3 rounded-lg border border-border/50">"Still blocked on Acme Prod access. Re-sent emails to their IT team. Will pivot to helping David with MyCiso documentation until they unlock my account."</p>
                    </div>

                    {/* Log 3 */}
                    <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" />
                            <AvatarFallback>DJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-sm text-foreground truncate">David Jones</span>
                            <span className="block text-xs text-muted-foreground">Today, 9:05 AM</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-md">MyCiso</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md">Meeting Heavy</span>
                        </div>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed pl-10 font-mono text-xs bg-muted/40 p-3 rounded-lg border border-border/50">"Mostly meetings today. 10AM Sync with client, 1PM design review for upcoming infra changes. Will try to squeeze in some doc updates."</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                    <p className="text-sm font-medium text-foreground">No Logs Available</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Switch to Cyber Security to view the mock employee logs.</p>
                  </div>
                )}

              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Evening Handover: Ground Truth Logs */}
        <Card className="border-0 shadow-md ring-1 ring-border/50 bg-card flex flex-col transition-all hover:shadow-lg h-[420px]">
          <CardHeader className="pb-4 border-b border-border/40 bg-muted/10 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">Ground Truth Logs</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">Raw Evening Updates ({activeTeam})</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                
                {activeTeam === "Cyber Security" ? (
                  <div className="space-y-4">
                    {/* Log 1 */}
                    <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                            <AvatarFallback>AL</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-sm text-foreground truncate">Alex Rivera</span>
                            <span className="block text-xs text-muted-foreground">Yesterday, 5:45 PM</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-md">MyCiso</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">Productive</span>
                        </div>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed pl-10 font-mono text-xs bg-muted/40 p-3 rounded-lg border border-border/50">"worked on myciso and make authorization update. automated 3 new test scripts for the pentest."</p>
                    </div>

                    {/* Log 2 */}
                    <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
                      <div className="flex justify-between items-start gap-4 mb-3 pl-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                            <AvatarFallback>SK</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-sm text-foreground truncate">Sarah Kim</span>
                            <span className="block text-xs text-muted-foreground">Yesterday, 6:15 PM</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-md">Acme Audit</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md">Blocked</span>
                        </div>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed pl-10 font-mono text-xs bg-muted/40 p-3 rounded-lg border border-border/50">"finished initial scan on acme prod servers but unable to access the internal DB subnet. waiting on client IT to whitelist my VPN IP."</p>
                    </div>

                    {/* Log 3 */}
                    <div className="group bg-card hover:bg-muted/30 border border-border/80 transition-colors rounded-xl p-4 shadow-sm ring-1 ring-transparent hover:ring-border">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" />
                            <AvatarFallback>DJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="block font-semibold text-sm text-foreground truncate">David Jones</span>
                            <span className="block text-xs text-muted-foreground">Yesterday, 5:00 PM</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-md">MyCiso</span>
                        </div>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed pl-10 font-mono text-xs bg-muted/40 p-3 rounded-lg border border-border/50">"code review for alex's auth updates. wrote documentation for the new endpoint."</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                    <p className="text-sm font-medium text-foreground">No Logs Available</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Switch to Cyber Security to view the mock employee logs.</p>
                  </div>
                )}

              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
