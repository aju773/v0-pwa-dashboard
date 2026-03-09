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
import { UserPlus, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: any) => void
}

export function OnboardingModal({ open, onOpenChange, onConfirm }: OnboardingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "Employee",
    teamLead: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onConfirm(formData)
    setIsSubmitting(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "Employee",
      teamLead: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <UserPlus className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Onboard New Hire</DialogTitle>
          <DialogDescription className="text-center">
            Create a new workspace profile. Credentials will be emailed automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="my-4 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Jane"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="rounded-xl bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="rounded-xl bg-muted/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane.doe@company.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-xl bg-muted/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(val) => setFormData({ ...formData, department: val })}
              >
                <SelectTrigger id="department" className="rounded-xl bg-muted/50">
                  <SelectValue placeholder="Select dept" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Access Role</Label>
              <Select
                value={formData.role}
                onValueChange={(val) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger id="role" className="rounded-xl bg-muted/50">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamLead">Assign to Team Lead</Label>
            <Select
              value={formData.teamLead}
              onValueChange={(val) => setFormData({ ...formData, teamLead: val })}
            >
              <SelectTrigger id="teamLead" className="rounded-xl bg-muted/50">
                <SelectValue placeholder="Select a manager" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="alex">Alex Morgan (Cybersecurity)</SelectItem>
                <SelectItem value="sarah">Sarah Connor (Engineering)</SelectItem>
                <SelectItem value="david">David Wallace (Marketing)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4 sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.email || isSubmitting}
              className="rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 size-4" />
                  Provisioning...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  Create Profile
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
