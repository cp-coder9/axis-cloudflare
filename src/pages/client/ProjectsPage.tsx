import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_PROJECTS } from "@shared/mock-data";
import { CheckCircle, Circle, Milestone } from "lucide-react";
import { cn } from "@/lib/utils";
const ProjectCard = ({ project }: { project: typeof MOCK_PROJECTS[0] }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>{project.status}</Badge>
      </div>
      <CardDescription>Due Date: {new Date(project.endDate).toLocaleDateString()}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{project.status === 'Completed' ? '100%' : '65%'}</span>
        </div>
        <Progress value={project.status === 'Completed' ? 100 : 65} />
      </div>
    </CardContent>
  </Card>
);
const TimelineItem = ({ title, date, isCompleted, isLast = false }: { title: string, date: string, isCompleted: boolean, isLast?: boolean }) => (
  <div className="flex items-start">
    <div className="flex flex-col items-center mr-4">
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isCompleted ? "bg-primary text-primary-foreground" : "bg-muted border")}>
        {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-3 h-3 text-muted-foreground" />}
      </div>
      {!isLast && <div className="w-px h-16 bg-border" />}
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
  </div>
);
export default function ClientProjectsPage() {
  const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'In Progress');
  const completedProjects = MOCK_PROJECTS.filter(p => p.status === 'Completed');
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Projects</h2>
          <p className="text-muted-foreground">Track the progress of your active and completed projects.</p>
        </div>
      </div>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
          <TabsTrigger value="timeline">Project Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </TabsContent>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Downtown Tower Timeline</CardTitle>
              <CardDescription>Key milestones for your flagship project.</CardDescription>
            </CardHeader>
            <CardContent>
              <TimelineItem title="Initial Design Approved" date="Feb 20, 2023" isCompleted />
              <TimelineItem title="Foundation Laid" date="May 15, 2023" isCompleted />
              <TimelineItem title="Structural Frame Complete" date="Dec 01, 2023" isCompleted />
              <TimelineItem title="Exterior Cladding" date="Jun 30, 2024" isCompleted={false} />
              <TimelineItem title="Interior Finishes" date="Oct 15, 2024" isCompleted={false} />
              <TimelineItem title="Project Handover" date="Dec 31, 2024" isCompleted={false} isLast />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}