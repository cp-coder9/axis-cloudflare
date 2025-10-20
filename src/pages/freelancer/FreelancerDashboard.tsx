import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_EARNINGS, MOCK_PROJECTS, MOCK_TIME_LOGS } from "@shared/mock-data";
import { CheckCircle, Clock, DollarSign, FolderKanban } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const totalHours = MOCK_TIME_LOGS.reduce((acc, log) => acc + log.duration, 0) / 3600;
const pendingEarnings = MOCK_EARNINGS.filter(e => e.status === 'Pending').reduce((acc, e) => acc + e.amount, 0);
const kpiData = [
  { title: "Hours Logged (Week)", value: totalHours.toFixed(1), icon: Clock },
  { title: "Pending Earnings", value: `R ${pendingEarnings.toLocaleString()}`, icon: DollarSign },
  { title: "Active Projects", value: MOCK_PROJECTS.filter(p => p.status === 'In Progress').length, icon: FolderKanban },
  { title: "Tasks Completed", value: "12", icon: CheckCircle },
];
const weeklyHoursData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 8 },
  { day: "Thu", hours: 5 },
  { day: "Fri", hours: 7.5 },
  { day: "Sat", hours: 2 },
  { day: "Sun", hours: 0 },
];
export default function FreelancerDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Hours</CardTitle>
            <CardDescription>Your logged hours for the current week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyHoursData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--accent))' }} />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Current Tasks</CardTitle>
            <CardDescription>Your assigned tasks across all projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_PROJECTS.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.client.name}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500/50 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">In Progress</Badge>
                </div>
              ))}
               <Button variant="outline" className="w-full" asChild>
                <Link to="/freelancer/projects">View All Projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}