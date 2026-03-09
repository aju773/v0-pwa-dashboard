"use client"

import { useState } from "react"
import { 
  Plus, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Send,
  ArrowUpRight,
  MessageSquare,
  Link2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { useRole } from "./role-context"

export interface Ticket {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
  status: "unresolved" | "resolved"
  linkedProject: string
  linkedClient: string
  blockedTask: string
  raisedBy: {
    name: string
    role: string
    avatar: string
    initials: string
  }
  timestamp: string
  replies: Array<{
    author: string
    message: string
    timestamp: string
  }>
}

export const tickets: Ticket[] = [
  {
    id: "1",
    title: "Need IAM access for AWS",
    description: "I'm currently blocked on the cloud infrastructure setup. I need IAM admin access to create the required roles and policies for the Lambda functions. Without this, I cannot proceed with the serverless deployment pipeline that was planned for this sprint.\n\nSpecifically, I need:\n- IAM:CreateRole\n- IAM:AttachRolePolicy\n- IAM:CreatePolicy\n\nThis is blocking the entire backend team from moving forward with the API deployment.",
    severity: "high",
    status: "unresolved",
    linkedProject: "Cloud Migration",
    linkedClient: "Acme Corp",
    blockedTask: "Setup AWS Lambda deployment pipeline",
    raisedBy: {
      name: "Marcus Chen",
      role: "DevOps Engineer",
      avatar: "",
      initials: "MC"
    },
    timestamp: "2 hours ago",
    replies: []
  },
  {
    id: "2",
    title: "Design assets missing for dashboard",
    description: "The Figma designs for the analytics dashboard haven't been shared yet. I need the component specifications and color tokens to proceed with the implementation.",
    severity: "medium",
    status: "unresolved",
    linkedProject: "Dashboard Redesign",
    linkedClient: "TechStart Inc",
    blockedTask: "Implement analytics dashboard UI",
    raisedBy: {
      name: "Emily Rodriguez",
      role: "Frontend Developer",
      avatar: "",
      initials: "ER"
    },
    timestamp: "4 hours ago",
    replies: [
      {
        author: "Design Team",
        message: "Working on it, will share by EOD",
        timestamp: "2 hours ago"
      }
    ]
  },
  {
    id: "3",
    title: "API rate limits hitting production",
    description: "We're seeing 429 errors in production. The third-party payment API is rate limiting our requests during peak hours. Need to implement caching or request queuing.",
    severity: "high",
    status: "unresolved",
    linkedProject: "Payment Integration",
    linkedClient: "GlobalRetail",
    blockedTask: "Payment processing optimization",
    raisedBy: {
      name: "James Wilson",
      role: "Backend Developer",
      avatar: "",
      initials: "JW"
    },
    timestamp: "6 hours ago",
    replies: []
  },
  {
    id: "4",
    title: "VPN access for remote database",
    description: "Need VPN credentials to access the client's on-premise database for the data migration project.",
    severity: "medium",
    status: "unresolved",
    linkedProject: "Data Migration",
    linkedClient: "HealthCare Plus",
    blockedTask: "Database schema analysis",
    raisedBy: {
      name: "Sarah Kim",
      role: "Data Engineer",
      avatar: "",
      initials: "SK"
    },
    timestamp: "1 day ago",
    replies: []
  },
  {
    id: "5",
    title: "SSL certificate renewal",
    description: "The staging environment SSL certificate expired. All API tests are failing with certificate errors.",
    severity: "low",
    status: "resolved",
    linkedProject: "Infrastructure",
    linkedClient: "Internal",
    blockedTask: "QA testing cycle",
    raisedBy: {
      name: "Alex Thompson",
      role: "QA Engineer",
      avatar: "",
      initials: "AT"
    },
    timestamp: "2 days ago",
    replies: [
      {
        author: "IT Admin",
        message: "Certificate renewed and deployed",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "6",
    title: "Onboarding hardware request for new hires",
    description: "We have 3 new engineers starting next Monday. I need approval and procurement status for their Macbook Pros and monitors.",
    severity: "medium",
    status: "unresolved",
    linkedProject: "HR / Operations",
    linkedClient: "Internal",
    blockedTask: "New Engineer Onboarding",
    raisedBy: {
      name: "Jessica Lee",
      role: "HR Generalist",
      avatar: "",
      initials: "JL"
    },
    timestamp: "3 hours ago",
    replies: []
  }
]

function SeverityBadge({ severity }: { severity: Ticket["severity"] }) {
  const styles = {
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-slate-50 text-slate-600 border-slate-200"
  }

  const labels = {
    high: "High",
    medium: "Medium",
    low: "Low"
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("rounded-full text-xs font-medium border", styles[severity])}
    >
      {labels[severity]}
    </Badge>
  )
}

function TicketCard({ 
  ticket, 
  isSelected, 
  onClick 
}: { 
  ticket: Ticket
  isSelected: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200",
        "hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isSelected 
          ? "bg-primary/5 border-primary/20 shadow-sm" 
          : "bg-card border-border hover:border-primary/20"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={ticket.raisedBy.avatar} alt={ticket.raisedBy.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            {ticket.raisedBy.initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "font-medium text-sm leading-tight line-clamp-2",
              ticket.status === "resolved" && "text-muted-foreground"
            )}>
              {ticket.title}
            </h4>
            <SeverityBadge severity={ticket.severity} />
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className="rounded-full text-xs font-normal bg-secondary/50 text-secondary-foreground/80"
            >
              <Link2 className="size-3 mr-1" />
              {ticket.linkedClient}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{ticket.raisedBy.name}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {ticket.timestamp}
            </span>
          </div>
          
          {ticket.status === "resolved" && (
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle2 className="size-3" />
              Resolved
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

function TicketDetail({ ticket }: { ticket: Ticket }) {
  const [replyText, setReplyText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentRole } = useRole()
  const canResolve = currentRole === "Team Lead" || currentRole === "Admin" || currentRole === "HR"

  const handleResolve = () => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <Avatar className="size-12">
            <AvatarImage src={ticket.raisedBy.avatar} alt={ticket.raisedBy.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {ticket.raisedBy.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-foreground">{ticket.raisedBy.name}</h3>
              <Badge variant="secondary" className="rounded-full text-xs">
                {ticket.raisedBy.role}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="size-4 text-amber-500" />
              <span>Blocked on: <span className="font-medium text-foreground">{ticket.blockedTask}</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <SeverityBadge severity={ticket.severity} />
            <Badge 
              variant="outline" 
              className="rounded-full text-xs border-primary/30 text-primary bg-primary/5"
            >
              {ticket.linkedProject}
            </Badge>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold text-foreground">{ticket.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Raised {ticket.timestamp} - Client: {ticket.linkedClient}
        </p>
      </div>

      {/* Message Body */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Original Message */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MessageSquare className="size-4" />
              Issue Description
            </div>
            <div className="bg-muted/40 rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap">
              {ticket.description}
            </div>
          </div>

          {/* Replies */}
          {ticket.replies.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">
                Activity ({ticket.replies.length})
              </div>
              {ticket.replies.map((reply, index) => (
                <div 
                  key={index}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-emerald-800">{reply.author}</span>
                    <span className="text-xs text-emerald-600">{reply.timestamp}</span>
                  </div>
                  <p className="text-sm text-emerald-900">{reply.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Reply Box */}
      {ticket.status === "unresolved" && canResolve && (
        <div className="p-4 border-t border-border bg-card">
          <div className="space-y-3">
            <Textarea
              placeholder="Type your solution here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[80px] resize-none rounded-xl border-border bg-muted/30 focus:bg-background transition-colors"
            />
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-amber-600"
              >
                <ArrowUpRight className="size-4 mr-2" />
                Escalate
              </Button>
              
              <Button 
                onClick={handleResolve}
                disabled={isSubmitting || !replyText.trim()}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resolving...
                  </>
                ) : (
                  <>
                    <Send className="size-4 mr-2" />
                    Resolve & Close Ticket
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      {ticket.status === "unresolved" && !canResolve && (
        <div className="p-6 border-t border-border bg-muted/20 text-center">
            <p className="text-sm text-muted-foreground">A Team Lead or Admin must resolve this ticket.</p>
        </div>
      )}

      {/* Resolved State */}
      {ticket.status === "resolved" && (
        <div className="p-4 border-t border-border bg-emerald-50">
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <CheckCircle2 className="size-5" />
            <span className="font-medium">This ticket has been resolved</span>
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyDetail() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <MessageSquare className="size-8 text-muted-foreground/50" />
      </div>
      <h3 className="font-medium text-foreground mb-1">Select a ticket</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Choose a ticket from the list to view details and take action
      </p>
    </div>
  )
}

export function InternalTickets() {
  const [filter, setFilter] = useState("all")
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>("1")
  const { currentRole } = useRole()

  const hrFilteredTickets = currentRole === "HR" 
    ? tickets.filter(t => t.linkedProject.includes("HR") || t.linkedProject.includes("Infrastructure") || t.raisedBy.role.includes("HR"))
    : tickets

  const filteredTickets = hrFilteredTickets.filter(ticket => {
    if (filter === "unresolved") return ticket.status === "unresolved"
    if (filter === "resolved") return ticket.status === "resolved"
    return true
  })

  const selectedTicket = filteredTickets.find(t => t.id === selectedTicketId) || filteredTickets[0]

  const unresolvedCount = hrFilteredTickets.filter(t => t.status === "unresolved").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {currentRole === "HR" ? "HR & Operations Helpdesk" : "Team Blockers & Tickets"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {unresolvedCount} unresolved {unresolvedCount === 1 ? "ticket" : "tickets"} requiring attention
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <ToggleGroup 
            type="single" 
            value={filter} 
            onValueChange={(value) => value && setFilter(value)}
            className="bg-muted/50 p-1 rounded-full"
          >
            <ToggleGroupItem 
              value="all" 
              className="rounded-full px-4 text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="unresolved" 
              className="rounded-full px-4 text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm"
            >
              Unresolved
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="resolved" 
              className="rounded-full px-4 text-sm data-[state=on]:bg-background data-[state=on]:shadow-sm"
            >
              Resolved
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <Plus className="size-4 mr-2" />
            Raise Issue
          </Button>
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-16rem)]">
        {/* Left Column - Ticket List */}
        <Card className="lg:col-span-1 border-border/60 shadow-sm overflow-hidden">
          <ScrollArea className="h-[calc(100vh-18rem)]">
            <div className="p-3 space-y-2">
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="size-10 mx-auto mb-3 text-emerald-500" />
                  <p className="font-medium">All clear!</p>
                  <p className="text-sm">No tickets match this filter</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    isSelected={selectedTicketId === ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Right Column - Ticket Detail */}
        <Card className="lg:col-span-2 border-border/60 shadow-sm overflow-hidden">
          {selectedTicket ? (
            <TicketDetail ticket={selectedTicket} />
          ) : (
            <EmptyDetail />
          )}
        </Card>
      </div>
    </div>
  )
}
