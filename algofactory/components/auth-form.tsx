"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function AuthForm({ type }: { type: "login" | "register" }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="grid gap-6 w-full max-w-md">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? <span>Loading...</span> : <span>Sign {type === "login" ? "in" : "up"} with Google</span>}
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          {type === "register" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" type="text" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="courseBatch">Course Batch</Label>
                <Select>
                  <SelectTrigger id="courseBatch">
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer2024">Summer 2024</SelectItem>
                    <SelectItem value="winter2024">Winter 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="leetcodeUrl">LeetCode Profile URL</Label>
                <Input id="leetcodeUrl" type="url" placeholder="https://leetcode.com/username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                <Input id="linkedinUrl" type="url" placeholder="https://www.linkedin.com/in/username" />
              </div>
            </>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <span>Loading...</span>}
            {!isLoading && <span>{type === "login" ? "Sign In" : "Sign Up"}</span>}
          </Button>
        </div>
      </form>
    </div>
  )
}

