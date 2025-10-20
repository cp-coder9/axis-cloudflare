import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_EARNINGS } from "@shared/mock-data";
import { cn } from "@/lib/utils";
import { Download, PlusCircle } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
const statusColors = {
  'Paid': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Overdue': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};
const earningsData = [
    { month: "Feb", total: 18000 },
    { month: "Mar", total: 22000 },
    { month: "Apr", total: 35000 },
    { month: "May", total: 28000 },
    { month: "Jun", total: 42000 },
    { month: "Jul", total: 25000 },
];
export default function FreelancerEarningsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Earnings</h2>
          <p className="text-muted-foreground">
            Track your payments and manage invoices.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Your earnings over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R${value/1000}k`} />
              <Tooltip formatter={(value: number) => [`R${value.toLocaleString()}`, "Earnings"]} />
              <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>A detailed list of all your transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_EARNINGS.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{new Date(earning.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{earning.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border-0", statusColors[earning.status])}>
                      {earning.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">R {earning.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}