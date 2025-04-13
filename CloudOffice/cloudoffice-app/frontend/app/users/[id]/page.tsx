import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState({
    id: params.id,
    name: "Алексей Иванов",
    nameEn: "Alexei Ivanov",
    email: "alexei@example.com",
    position: "Senior Developer",
    avatar: "",
    initials: "АИ",
    oauthProviders: ["Google", "GitHub"],
  })

  const positions = [
    "Senior Developer",
    "Developer",
    "UI/UX Designer",
    "Project Manager",
    "QA Engineer",
    "Business Analyst",
  ]

  const modules = [
    { id: "dashboard", name: "Dashboard", access: true },
    { id: "users", name: "Users", access: true },
    { id: "clients", name: "Clients", access: true },
    { id: "projects", name: "Projects", access: true },
    { id: "tasks", name: "Tasks", access: true },
    { id: "time-entries", name: "Time Entries", access: true },
    { id: "expense-entries", name: "Expense Entries", access: false },
    { id: "documents", name: "Documents", access: true },
    { id: "invoices", name: "Invoices", access: false },
    { id: "activities", name: "Activities", access: true },
    { id: "reports", name: "Reports", access: false },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <a href="/users">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Edit the user's personal information and settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name (Cyrillic)</Label>
                    <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameEn">Full Name (English)</Label>
                    <Input
                      id="nameEn"
                      value={user.nameEn}
                      onChange={(e) => setUser({ ...user, nameEn: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select value={user.position} onValueChange={(value) => setUser({ ...user, position: value })}>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected OAuth Providers</CardTitle>
                <CardDescription>Manage the user's connected authentication providers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Google</div>
                      <div className="text-sm text-muted-foreground">
                        {user.oauthProviders.includes("Google") ? "Connected" : "Not connected"}
                      </div>
                    </div>
                    <Button variant={user.oauthProviders.includes("Google") ? "destructive" : "outline"}>
                      {user.oauthProviders.includes("Google") ? "Disconnect" : "Connect"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-muted-foreground">
                        {user.oauthProviders.includes("GitHub") ? "Connected" : "Not connected"}
                      </div>
                    </div>
                    <Button variant={user.oauthProviders.includes("GitHub") ? "destructive" : "outline"}>
                      {user.oauthProviders.includes("GitHub") ? "Disconnect" : "Connect"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Microsoft</div>
                      <div className="text-sm text-muted-foreground">
                        {user.oauthProviders.includes("Microsoft") ? "Connected" : "Not connected"}
                      </div>
                    </div>
                    <Button variant={user.oauthProviders.includes("Microsoft") ? "destructive" : "outline"}>
                      {user.oauthProviders.includes("Microsoft") ? "Connect" : "Connect"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Module Access</CardTitle>
                <CardDescription>Control which modules this user can access in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="font-medium">{module.name}</div>
                      <Switch
                        checked={module.access}
                        onCheckedChange={(checked) => console.log(`${module.name} access: ${checked}`)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

