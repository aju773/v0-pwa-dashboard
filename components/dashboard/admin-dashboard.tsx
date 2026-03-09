"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldAlert, ArrowRight, UserCheck, CheckCircle2, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Admin Command Center</h2>
          <p className="text-sm text-muted-foreground">System overview & high-priority escalations</p>
        </div>
      </div>

      {/* Tier 3 Escalation Widget */}
      <Card className="border-0 shadow-md ring-1 ring-destructive/10 bg-gradient-to-br from-destructive/5 to-transparent relative overflow-hidden">
        {/* Decorative corner stripe */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-bl-full -z-10 translate-x-12 -translate-y-12" />
        
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-destructive/20">
              <ShieldAlert className="size-4 text-destructive" />
            </div>
            <h3 className="text-base font-semibold text-destructive">Action Required: Tier-3 Escalations</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="rounded-xl border border-destructive/20 bg-card p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-start md:items-center gap-4">
              <Avatar className="size-12 ring-2 ring-destructive/30">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Marcus" />
                <AvatarFallback className="bg-destructive/10 text-destructive font-medium">MT</AvatarFallback>
              </Avatar>
              
              <div>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  Marcus Thompson 
                  <span className="inline-flex rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold tracking-widest text-rose-700 uppercase">
                    14 Days Leave
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">Cloud Architect • Engineering</p>
                <div className="mt-2 text-xs flex items-center gap-3 text-muted-foreground/80">
                  <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-emerald-500" /> TL Approved</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-emerald-500" /> HR Approved</span>
                  <span className="flex items-center gap-1"><Clock className="size-3 text-amber-500" /> Pending Admin</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:border-l md:border-border md:pl-6">
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <Button variant="default" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  Review Request <ArrowRight className="ml-2 size-3.5" />
                </Button>
                <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
                  Dismiss for now
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Org Health Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm border-t-4 border-t-primary">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Workforce</p>
            <p className="text-3xl font-bold text-foreground">37</p>
            <p className="text-xs text-emerald-600 mt-2 flex items-center font-medium">
              +3 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm border-t-4 border-t-blue-500">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Projects</p>
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-xs text-blue-600 mt-2 flex items-center font-medium">
              Across 5 Clients
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm border-t-4 border-t-emerald-500">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">System Health</p>
            <p className="text-3xl font-bold text-foreground">100%</p>
            <p className="text-xs text-muted-foreground mt-2 flex items-center font-medium">
              No reported outages
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm border-t-4 border-t-amber-500">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Unresolved Tickets</p>
            <p className="text-3xl font-bold text-foreground">4</p>
            <p className="text-xs text-amber-600 mt-2 flex items-center font-medium">
              Requires TL Attention
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
