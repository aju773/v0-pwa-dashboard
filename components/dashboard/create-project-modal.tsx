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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Target, Briefcase } from "lucide-react"

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: any) => void
}

export function CreateProjectModal({ open, onOpenChange, onConfirm }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    serviceType: "",
    projectName: "",
    milestoneName: "",
    milestoneTotal: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.clientName || !formData.projectName) return
    onConfirm(formData)
    setFormData({
      clientName: "",
      serviceType: "",
      projectName: "",
      milestoneName: "",
      milestoneTotal: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-emerald-500/10">
            <Rocket className="size-6 text-emerald-600" />
          </div>
          <DialogTitle className="text-center text-xl">Provision New Project</DialogTitle>
          <DialogDescription className="text-center">
            Create an active project and start assigning resources.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="my-4 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Select Client</Label>
              <Select
                value={formData.clientName}
                onValueChange={(val) => setFormData({ ...formData, clientName: val })}
              >
                <SelectTrigger id="clientName" className="rounded-xl bg-muted/50">
                  <SelectValue placeholder="Choose client" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                  <SelectItem value="TechStart Inc">TechStart Inc</SelectItem>
                  <SelectItem value="GlobalBank Ltd">GlobalBank Ltd</SelectItem>
                  <SelectItem value="HealthCare Plus">HealthCare Plus</SelectItem>
                  <SelectItem value="SecureFinance">SecureFinance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(val) => setFormData({ ...formData, serviceType: val })}
              >
                <SelectTrigger id="serviceType" className="rounded-xl bg-muted/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Cybersecurity: Incident Handling">Incident Handling</SelectItem>
                  <SelectItem value="Cybersecurity: Penetration Testing">Penetration Testing</SelectItem>
                  <SelectItem value="App Development">App Development</SelectItem>
                  <SelectItem value="Cloud Infrastructure">Cloud Infrastructure</SelectItem>
                  <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="projectName"
                placeholder="e.g. Q4 Cloud Migration"
                required
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="pl-9 rounded-xl bg-muted/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-4">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="milestoneName">Initial Milestone</Label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="milestoneName"
                  placeholder="e.g. Phase 1 Discovery"
                  required
                  value={formData.milestoneName}
                  onChange={(e) => setFormData({ ...formData, milestoneName: e.target.value })}
                  className="pl-9 rounded-xl bg-muted/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="milestoneTotal">Tasks Count</Label>
              <Input
                id="milestoneTotal"
                type="number"
                min="1"
                placeholder="0"
                required
                value={formData.milestoneTotal}
                onChange={(e) => setFormData({ ...formData, milestoneTotal: e.target.value })}
                className="rounded-xl bg-muted/50"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="hover:bg-muted mr-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.clientName || !formData.projectName || !formData.serviceType}
              className="rounded-full shadow-md hover:shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              <Rocket className="mr-2 size-4" />
              Initialize Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
