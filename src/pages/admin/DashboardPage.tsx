import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PROJECTS, MOCK_TEAM_MEMBERS } from "@shared/mock-data";
import { Activity, ArrowUpRight, DollarSign, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const kpiData = [
  { title: "Total Revenue", value: "R 678,478.35", change: "+20.1% from last month", icon: DollarSign },
  { title: "Active Projects", value: MOCK_PROJECTS.length.toString(), change: "+3 since last month", icon: Activity },
  { title: "Team Members", value: MOCK_TEAM_MEMBERS.length.toString(), change: "+2 new hires", icon: Users },
  { title: "Client Satisfaction", value: "92%", change: "+5% from last quarter", icon: ArrowUpRight },
];
const revenueData = [
  { name: "Jan", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Feb", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Mar", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Apr", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "May", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Jun", total: Math.floor(Math.random() * 50000) + 10000 },
];
export default function AdminDashboardPage() {
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
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R${value/1000}k`} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_PROJECTS.slice(0, 5).map((project, index) => (
                <div className="flex items-center" key={project.id}>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://i.pravatar.cc/40?u=${MOCK_TEAM_MEMBERS[index % MOCK_TEAM_MEMBERS.length].id}`} alt="Avatar" />
                    <AvatarFallback>{MOCK_TEAM_MEMBERS[index % MOCK_TEAM_MEMBERS.length].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{project.name}</p>
                    <p className="text-sm text-muted-foreground">Status updated to {project.status}</p>
                  </div>
                  <div className="ml-auto font-medium text-sm">R {project.budget.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}