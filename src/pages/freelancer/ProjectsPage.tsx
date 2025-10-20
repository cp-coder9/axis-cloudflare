import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_PROJECTS } from "@shared/mock-data";
const ProjectCard = ({ project }: { project: typeof MOCK_PROJECTS[0] }) => (
  <Card className="flex flex-col">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <Badge variant="secondary">{project.status}</Badge>
      </div>
      <CardDescription>{project.client.name}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Progress</span>
          <span>65%</span>
        </div>
        <Progress value={65} />
      </div>
      <div className="text-sm text-muted-foreground">
        Due Date: {new Date(project.endDate).toLocaleDateString()}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">View Details</Button>
    </CardFooter>
  </Card>
);
export default function FreelancerProjectsPage() {
  const assignedProjects = MOCK_PROJECTS.filter(p => p.status === 'In Progress');
  const availableProjects = MOCK_PROJECTS.filter(p => p.status === 'Planning' || p.status === 'On Hold');
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your assigned projects and find new opportunities.
          </p>
        </div>
      </div>
      <Tabs defaultValue="assigned">
        <TabsList>
          <TabsTrigger value="assigned">Assigned Projects</TabsTrigger>
          <TabsTrigger value="available">Available Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="assigned">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignedProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </TabsContent>
        <TabsContent value="available">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}