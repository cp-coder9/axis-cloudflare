import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api-client";
import { Project, User, Client } from "@shared/types";
import { cn } from "@/lib/utils";
import { PlusCircle, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
const statusColors = {
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Planning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'On Hold': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};
const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  budget: z.coerce.number().min(1, "Budget must be a positive number"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  clientId: z.string().min(1, "Client is required"),
  teamMemberIds: z.array(z.string()).min(1, "At least one team member must be selected"),
});
type ProjectFormData = z.infer<typeof projectSchema>;
export default function AdminProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api('/api/projects'),
  });
  const { data: clients } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: () => api('/api/clients'),
  });
  const { data: teamMembers } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => api('/api/users?role=freelancer'),
  });
  const mutation = useMutation({
    mutationFn: (newProject: ProjectFormData) => api('/api/projects', {
      method: 'POST',
      body: JSON.stringify(newProject),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project created successfully!");
      setIsDialogOpen(false);
      reset();
    },
    onError: (err) => {
      toast.error(`Failed to create project: ${err.message}`);
    }
  });
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      teamMemberIds: [],
    }
  });
  const onSubmit = (data: ProjectFormData) => {
    mutation.mutate(data);
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Here's a list of all projects in your firm.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new project.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" {...register("name")} className="col-span-3" />
                  {errors.name && <p className="col-span-4 text-red-500 text-sm text-right">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget" className="text-right">Budget (R)</Label>
                  <Input id="budget" type="number" {...register("budget")} className="col-span-3" />
                  {errors.budget && <p className="col-span-4 text-red-500 text-sm text-right">{errors.budget.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">Start Date</Label>
                  <Input id="startDate" type="date" {...register("startDate")} className="col-span-3" />
                  {errors.startDate && <p className="col-span-4 text-red-500 text-sm text-right">{errors.startDate.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">End Date</Label>
                  <Input id="endDate" type="date" {...register("endDate")} className="col-span-3" />
                  {errors.endDate && <p className="col-span-4 text-red-500 text-sm text-right">{errors.endDate.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="clientId" className="text-right">Client</Label>
                  <Controller
                    name="clientId"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients?.map(client => (
                            <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.clientId && <p className="col-span-4 text-red-500 text-sm text-right">{errors.clientId.message}</p>}
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Team</Label>
                  <Controller
                    name="teamMemberIds"
                    control={control}
                    render={({ field }) => (
                      <div className="col-span-3 space-y-2">
                        {teamMembers?.map((member) => (
                          <div key={member.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`team-${member.id}`}
                              checked={field.value?.includes(member.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, member.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (id) => id !== member.id
                                      )
                                    );
                              }}
                            />
                            <label
                              htmlFor={`team-${member.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {member.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.teamMemberIds && <p className="col-span-4 text-red-500 text-sm text-right">{errors.teamMemberIds.message}</p>}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Manage and track all ongoing and completed projects.</CardDescription>
          <div className="relative pt-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-8 w-full md:w-1/3" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">Failed to load projects.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("border-0", statusColors[project.status])}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">R {project.budget.toLocaleString()}</TableCell>
                    <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}