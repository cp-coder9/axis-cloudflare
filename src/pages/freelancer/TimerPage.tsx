import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, PlusCircle, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTimerStore from '@/stores/use-timer-store';
import { api } from '@/lib/api-client';
import { TimeLog, Project } from '@shared/types';
import { toast } from 'sonner';
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
};
const ActiveTimer = () => {
  const queryClient = useQueryClient();
  const { isRunning, elapsedSeconds, projectId, start, pause, reset: resetStore, setProjectId } = useTimerStore(state => ({
    isRunning: state.isRunning,
    elapsedSeconds: state.elapsedSeconds,
    projectId: state.projectId,
    start: state.start,
    pause: state.pause,
    reset: state.reset,
    setProjectId: state.setProjectId,
  }));
  const mutation = useMutation({
    mutationFn: (newLog: Omit<TimeLog, 'id'>) => api('/api/timelogs', {
      method: 'POST',
      body: JSON.stringify(newLog),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timelogs'] });
      toast.success("Time log saved successfully!");
      resetStore();
    },
    onError: (err) => {
      toast.error(`Failed to save time log: ${err.message}`);
    }
  });
  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api('/api/projects'),
  });

  const handleReset = () => {
    if (elapsedSeconds > 0 && projectId) {
      const project = projects?.find(p => p.id === projectId);
      const newLog = {
        projectId,
        projectName: project?.name || 'Unknown Project',
        date: new Date().toISOString().split('T')[0],
        startTime: 'N/A',
        endTime: 'N/A',
        duration: elapsedSeconds,
        description: `Logged ${formatTime(elapsedSeconds)} for ${project?.name}`,
      };
      mutation.mutate(newLog);
    } else {
      resetStore();
    }
  };
  const selectedProject = projects?.find(p => p.id === projectId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Timer</CardTitle>
        <CardDescription>Track your work in real-time.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 py-12">
        <div className="text-7xl font-bold font-mono tracking-tighter">
          {formatTime(elapsedSeconds)}
        </div>
        <div className="w-full max-w-sm">
          <Select value={projectId || ''} onValueChange={(value) => setProjectId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingProjects ? (
                <SelectItem value="loading" disabled>Loading projects...</SelectItem>
              ) : (
                projects?.map(project => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {selectedProject ? `Client: ${selectedProject.client.name}` : 'No project selected'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" onClick={isRunning ? pause : start} className="w-32">
            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button size="lg" variant="outline" onClick={handleReset} disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Square className="mr-2 h-5 w-5" />}
            Finish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
const TimeLogs = () => {
  const { data: logs, isLoading, error } = useQuery<TimeLog[]>({
    queryKey: ['timelogs'],
    queryFn: () => api('/api/timelogs'),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Logs</CardTitle>
        <CardDescription>Your historical time entries.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load time logs.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs?.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.projectName}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{formatTime(log.duration)}</TableCell>
                  <TableCell>{log.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
const ManualEntry = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState({
    date: '',
    projectId: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api('/api/projects'),
  });

  const mutation = useMutation({
    mutationFn: (newLog: Omit<TimeLog, 'id'>) => api('/api/timelogs', {
      method: 'POST',
      body: JSON.stringify(newLog),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timelogs'] });
      toast.success("Time log saved successfully!");
      setFormData({ date: '', projectId: '', startTime: '', endTime: '', description: '' });
    },
    onError: (err) => {
      toast.error(`Failed to save time log: ${err.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { date, projectId, startTime, endTime, description } = formData;
    if (!date || !projectId || !startTime || !endTime) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    if (end <= start) {
      toast.error("End time must be after start time.");
      return;
    }

    const duration = Math.round((end.getTime() - start.getTime()) / 1000);
    const project = projects?.find(p => p.id === projectId);

    const newLog = {
      projectId,
      projectName: project?.name || 'Unknown Project',
      date,
      startTime,
      endTime,
      duration,
      description: description || `Manual entry for ${project?.name}`,
    };
    mutation.mutate(newLog);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleProjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, projectId: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Entry</CardTitle>
        <CardDescription>Add time for work completed without the timer.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={formData.projectId} onValueChange={handleProjectChange}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingProjects ? (
                    <SelectItem value="loading" disabled>Loading projects...</SelectItem>
                  ) : (
                    projects?.map(project => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g., Initial design concepts" value={formData.description} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            Add Time Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default function FreelancerTimerPage() {
  const pause = useTimerStore(s => s.pause);
  useEffect(() => {
    return () => {
      pause();
    }
  }, [pause]);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Timer & Tracking</h2>
          <p className="text-muted-foreground">
            Manage your work hours efficiently.
          </p>
        </div>
      </div>
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
          <TabsTrigger value="active">Active Timer</TabsTrigger>
          <TabsTrigger value="logs">Time Logs</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        <TabsContent value="active"><ActiveTimer /></TabsContent>
        <TabsContent value="logs"><TimeLogs /></TabsContent>
        <TabsContent value="manual"><ManualEntry /></TabsContent>
      </Tabs>
    </div>
  );
}