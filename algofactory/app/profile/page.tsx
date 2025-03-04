"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </div>
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label htmlFor="leetcodeUrl">LeetCode Profile URL</Label>
          <Input id="leetcodeUrl" type="url" placeholder="https://leetcode.com/username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
          <Input id="linkedinUrl" type="url" placeholder="https://www.linkedin.com/in/username" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  )
}

