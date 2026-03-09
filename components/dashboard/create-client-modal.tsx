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
import { Building2, Plus, Briefcase, Phone, Mail } from "lucide-react"

interface CreateClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (clientName: string) => void
}

export function CreateClientModal({ open, onOpenChange, onConfirm }: CreateClientModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    industry: "",
    email: "",
    phone: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.clientName) return
    onConfirm(formData.clientName)
    setFormData({
      clientName: "",
      industry: "",
      email: "",
      phone: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">New Client Registration</DialogTitle>
          <DialogDescription className="text-center">
            Add a new enterprise client to the organization's CRM.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="my-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="clientName"
                placeholder="Acme Corporation"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="pl-9 rounded-xl bg-muted/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry / Sector</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="industry"
                placeholder="e.g. Financial Services"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="pl-9 rounded-xl bg-muted/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@acme.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-9 rounded-xl bg-muted/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-9 rounded-xl bg-muted/50"
                />
              </div>
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
              disabled={!formData.clientName}
              className="rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 px-6"
            >
              <Plus className="mr-2 size-4" />
              Create Client Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
