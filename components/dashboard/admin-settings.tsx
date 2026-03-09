"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, LayoutGrid, Shield, Briefcase, Trash2, Edit2 } from "lucide-react"

interface OrgItem {
  id: string
  name: string
  count: number
}

const initialDepartments: OrgItem[] = [
  { id: "1", name: "Engineering", count: 18 },
  { id: "2", name: "Cybersecurity", count: 8 },
  { id: "3", name: "Design", count: 4 },
  { id: "4", name: "Marketing", count: 5 },
]

const initialDesignations: OrgItem[] = [
  { id: "1", name: "Software Engineer", count: 12 },
  { id: "2", name: "SecOps Lead", count: 2 },
  { id: "3", name: "UX Researcher", count: 2 },
  { id: "4", name: "Cloud Architect", count: 4 },
  { id: "5", name: "Data Analyst", count: 3 },
  { id: "6", name: "Team Lead", count: 5 },
]

export function AdminSettings() {
  const [departments, setDepartments] = useState<OrgItem[]>(initialDepartments)
  const [designations, setDesignations] = useState<OrgItem[]>(initialDesignations)
  
  const [newDeptName, setNewDeptName] = useState("")
  const [newDesigName, setNewDesigName] = useState("")

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDeptName.trim()) return
    setDepartments([
      ...departments,
      { id: Date.now().toString(), name: newDeptName, count: 0 }
    ])
    setNewDeptName("")
  }

  const handleAddDesignation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDesigName.trim()) return
    setDesignations([
      ...designations,
      { id: Date.now().toString(), name: newDesigName, count: 0 }
    ])
    setNewDesigName("")
  }

  const handleDelete = (type: "dept" | "desig", id: string) => {
    if (type === "dept") {
      setDepartments(departments.filter(d => d.id !== id))
    } else {
      setDesignations(designations.filter(d => d.id !== id))
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10">
            <Settings className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">System Configurations</h1>
            <p className="text-sm text-muted-foreground">Manage organization structure, roles, and global settings</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Departments Manager */}
        <Card className="border-0 shadow-md ring-1 ring-border/40 flex flex-col h-[500px]">
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <LayoutGrid className="size-4 text-muted-foreground" />
              <CardTitle className="text-lg">Departments</CardTitle>
            </div>
            <CardDescription>Logical grouping for your workforce.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            <form onSubmit={handleAddDepartment} className="flex gap-2">
              <Input
                placeholder="e.g. Video Editing"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                className="rounded-xl flex-1 bg-muted/40"
              />
              <Button type="submit" disabled={!newDeptName.trim()} className="rounded-xl">
                <Plus className="size-4 mr-2" /> Add
              </Button>
            </form>

            <div className="space-y-2 mt-4">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{dept.name}</span>
                    <Badge variant="secondary" className="rounded-md font-normal text-xs">
                      {dept.count} members
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-8 rounded-full">
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete("dept", dept.id)}
                      disabled={dept.count > 0}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles & Designations Manager */}
        <Card className="border-0 shadow-md ring-1 ring-border/40 flex flex-col h-[500px]">
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-muted-foreground" />
              <CardTitle className="text-lg">Designations & Roles</CardTitle>
            </div>
            <CardDescription>Specific job titles assigned to employees.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            <form onSubmit={handleAddDesignation} className="flex gap-2">
              <Input
                placeholder="e.g. Senior Copywriter"
                value={newDesigName}
                onChange={(e) => setNewDesigName(e.target.value)}
                className="rounded-xl flex-1 bg-muted/40"
              />
              <Button type="submit" disabled={!newDesigName.trim()} className="rounded-xl">
                <Plus className="size-4 mr-2" /> Add
              </Button>
            </form>

            <div className="space-y-2 mt-4">
              {designations.map((desig) => (
                <div key={desig.id} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{desig.name}</span>
                    <Badge variant="secondary" className="rounded-md font-normal text-xs">
                      {desig.count} members
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-8 rounded-full">
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete("desig", desig.id)}
                      disabled={desig.count > 0}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Overview (Static UI for context) */}
      <Card className="border-0 shadow-md ring-1 ring-primary/20 bg-primary/5 mt-6 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="size-6 text-primary shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-foreground">Global RBAC Policies Active</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                All created Roles map primarily to <strong>Employee</strong> rights by default. To elevate a role to <strong>Team Lead</strong> or <strong>HR</strong>, modify their Access Role in the active Directory.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
