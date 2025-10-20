import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_APPLICATIONS } from "@shared/mock-data";
import { cn } from "@/lib/utils";
const statusColors = {
  'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Viewed': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  'Accepted': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};
export default function FreelancerApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Applications</h2>
        <p className="text-muted-foreground">Track the status of your project applications.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>Here is a list of all your past and present applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_APPLICATIONS.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.projectName}</TableCell>
                  <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border-0", statusColors[app.status])}>
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}