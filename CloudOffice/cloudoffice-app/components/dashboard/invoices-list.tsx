"use client"

import { Check, Clock, File, FileX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Invoice {
  id: string
  client: string
  project: string
  amount: number
  status: "Draft" | "Submitted" | "Paid" | "Overdue"
  date: string
}

const invoicesData: Invoice[] = [
  {
    id: "INV-001",
    client: "TechCorp",
    project: "Marketing Website Redesign",
    amount: 3500,
    status: "Draft",
    date: "2023-03-01",
  },
  {
    id: "INV-002",
    client: "InnovateSoft",
    project: "Mobile App Development",
    amount: 5000,
    status: "Submitted",
    date: "2023-02-15",
  },
  {
    id: "INV-003",
    client: "ShopSmart",
    project: "E-commerce Platform Integration",
    amount: 7500,
    status: "Paid",
    date: "2023-02-01",
  },
  {
    id: "INV-004",
    client: "NewEdge",
    project: "Branding Campaign",
    amount: 2800,
    status: "Overdue",
    date: "2023-01-15",
  },
  {
    id: "INV-005",
    client: "GlobalServices",
    project: "CRM Implementation",
    amount: 4200,
    status: "Draft",
    date: "2023-03-05",
  },
  {
    id: "INV-006",
    client: "TechCorp",
    project: "SEO Optimization",
    amount: 1800,
    status: "Paid",
    date: "2023-02-10",
  },
]

export function InvoicesList({ filter }: { filter: string }) {
  // Filter invoices based on status
  const filteredInvoices =
    filter === "all" ? invoicesData : invoicesData.filter((invoice) => invoice.status.toLowerCase() === filter)

  // Calculate total
  const total = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Showing {filteredInvoices.length} invoices</div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="text-xl font-bold">${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="space-y-3">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {invoice.status === "Draft" ? (
                    <File className="h-9 w-9 text-blue-400 bg-blue-400/10 p-1.5 rounded-md" />
                  ) : invoice.status === "Submitted" ? (
                    <Clock className="h-9 w-9 text-yellow-400 bg-yellow-400/10 p-1.5 rounded-md" />
                  ) : invoice.status === "Paid" ? (
                    <Check className="h-9 w-9 text-green-400 bg-green-400/10 p-1.5 rounded-md" />
                  ) : (
                    <FileX className="h-9 w-9 text-red-400 bg-red-400/10 p-1.5 rounded-md" />
                  )}
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-sm text-muted-foreground">{invoice.client}</div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="font-medium">{invoice.project}</div>
                  <div className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${invoice.amount.toLocaleString()}</div>
                  <Badge
                    variant={
                      invoice.status === "Paid"
                        ? "success"
                        : invoice.status === "Overdue"
                          ? "destructive"
                          : invoice.status === "Submitted"
                            ? "default"
                            : "secondary"
                    }
                    className="mt-1"
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex justify-center items-center py-6 text-muted-foreground">No invoices found</div>
        )}
      </div>
    </div>
  )
}

