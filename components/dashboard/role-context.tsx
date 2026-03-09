"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export type Role = "Employee" | "Team Lead" | "HR" | "Admin"

interface RoleContextType {
  currentRole: Role
  setCurrentRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  // Default to Team Lead since that's what we showcased first, 
  // but we can easily switch to Employee now.
  const [currentRole, setCurrentRole] = useState<Role>("Team Lead")

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
