"use client"

import { useState } from "react"
import { Hexagon, Eye, EyeOff, Building2, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Redirect would happen here
    window.location.href = "/"
  }

  const handleSSOLogin = async () => {
    setIsLoading(true)
    // Simulate SSO redirect
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-muted/40 p-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:80px_80px] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:80px_80px] opacity-30 pointer-events-none" />
      
      <Card className="w-full max-w-md relative z-10 border-0 shadow-xl shadow-foreground/5 bg-card">
        <CardHeader className="space-y-4 text-center pb-2">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Hexagon className="size-8 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold tracking-tight text-balance">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Sign in to your workspace
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4.5" />
                  ) : (
                    <Eye className="size-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="rounded-md"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal text-muted-foreground cursor-pointer select-none"
                >
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          {/* Divider */}
          <div className="relative w-full">
            <Separator className="my-2" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          {/* SSO Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleSSOLogin}
            disabled={isLoading}
            className="w-full h-11 rounded-full font-medium text-sm border-border/80 hover:bg-muted/50 transition-all"
          >
            <Building2 className="size-4 mr-2" />
            Sign in with Company SSO
          </Button>

          {/* Footer text */}
          <p className="text-xs text-center text-muted-foreground pt-2">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* Mobile-friendly bottom safe area padding */}
      <div className="fixed bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] bg-muted/40" />
    </div>
  )
}
