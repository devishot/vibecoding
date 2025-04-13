import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Plus, PencilIcon, ArchiveIcon, Building, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Client {
  id: string
  name: string
  nameEn: string
  projectCount: number
  description: string
  address: string
  status: "active" | "archived"
}

const clients: Client[] = [
  {
    id: "CLT-001",
    name: "ТехКорп",
    nameEn: "TechCorp",
    projectCount: 3,
    description: "IT solutions provider specializing in custom software development.",
    address: "123 Innovation St, Moscow, Russia",
    status: "active",
  },
  {
    id: "CLT-002",
    name: "ИнноватСофт",
    nameEn: "InnovateSoft",
    projectCount: 1,
    description: "Mobile app development company focusing on user experience.",
    address: "456 Tech Ave, St. Petersburg, Russia",
    status: "active",
  },
  {
    id: "CLT-003",
    name: "ШопСмарт",
    nameEn: "ShopSmart",
    projectCount: 2,
    description: "E-commerce solutions provider with focus on retail integrations.",
    address: "789 Commerce Blvd, Kazan, Russia",
    status: "active",
  },
  {
    id: "CLT-004",
    name: "НоваяГрань",
    nameEn: "NewEdge",
    projectCount: 1,
    description: "Marketing agency specializing in branding and digital campaigns.",
    address: "321 Creative Dr, Novosibirsk, Russia",
    status: "active",
  },
  {
    id: "CLT-005",
    name: "ГлобалСервисез",
    nameEn: "GlobalServices",
    projectCount: 1,
    description: "Business consulting and IT services for enterprise clients.",
    address: "654 Business Park, Sochi, Russia",
    status: "archived",
  },
  {
    id: "CLT-006",
    name: "ФинТек Солюшнс",
    nameEn: "FinTech Solutions",
    projectCount: 0,
    description: "Financial technology provider specializing in payment processing.",
    address: "987 Finance St, Moscow, Russia",
    status: "archived",
  },
]

export default function ClientsPage() {
  const [sortField, setSortField] = useState<keyof Client>("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Sort by field
  const sortBy = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort clients
  const activeClients = [...clients]
    .filter((client) => client.status === "active")
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const archivedClients = [...clients]
    .filter((client) => client.status === "archived")
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const ClientsTable = ({ data }: { data: Client[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("id")}>
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("name")}>
                Company Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("projectCount")}>
                Projects
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.id}</TableCell>
              <TableCell>
                <div className="space-y-0.5">
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs text-muted-foreground">{client.nameEn}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{client.projectCount}</TableCell>
              <TableCell className="hidden lg:table-cell max-w-md truncate">{client.description}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/clients/${client.id}`} className="cursor-pointer">
                        <Building className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/clients/${client.id}/edit`} className="cursor-pointer">
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/clients/${client.id}/projects`} className="cursor-pointer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Projects
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <ArchiveIcon className="mr-2 h-4 w-4" />
                      {client.status === "archived" ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <Button asChild>
            <Link href="/clients/new">
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeClients.length > 0 ? (
              <ClientsTable data={activeClients} />
            ) : (
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                No active clients found
              </div>
            )}
          </TabsContent>

          <TabsContent value="archived">
            {archivedClients.length > 0 ? (
              <ClientsTable data={archivedClients} />
            ) : (
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                No archived clients found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

