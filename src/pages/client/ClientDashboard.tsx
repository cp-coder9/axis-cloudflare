import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_PROJECTS, MOCK_TEAM_MEMBERS } from "@shared/mock-data";
import { CheckCircle, Clock, FolderKanban, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
const kpiData = [
  { title: "Active Projects", value: MOCK_PROJECTS.filter(p => p.status === 'In Progress').length, icon: FolderKanban },
  { title: "Milestones Met", value: "8 / 12", icon: CheckCircle },
  { title: "Hours Logged", value: "342", icon: Clock },
  { title: "Unread Messages", value: "3", icon: MessageSquare },
];
export default function ClientDashboardPage() {
  const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'In Progress');
  const accountManager = MOCK_TEAM_MEMBERS.find(tm => tm.role === 'Project Manager');
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {activeProjects[0].client.contactPerson}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>An overview of your projects currently in progress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-muted-foreground">Due: {new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/client/projects">View Details</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Account Manager</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            {accountManager && (
              <>
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={accountManager.avatarUrl} />
                  <AvatarFallback>{accountManager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{accountManager.name}</p>
                <p className="text-sm text-muted-foreground">{accountManager.role}</p>
                <Button className="mt-4 w-full" asChild>
                  <Link to="/client/messages">
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}