import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, FileText, Clipboard, Check } from 'lucide-react';
import { MOCK_PROJECTS } from '@shared/mock-data';
import { WordAssistantTemplate, GeneratedDocument } from '@shared/types';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
const templates: WordAssistantTemplate[] = [
  { id: 'project-proposal', title: 'Project Proposal', description: 'Generate a comprehensive project proposal.', icon: 'FileText' },
  { id: 'meeting-minutes', title: 'Meeting Minutes', description: 'Summarize a meeting into formal minutes.', icon: 'Clipboard' },
  { id: 'technical-report', title: 'Technical Report', description: 'Create a detailed technical specification.', icon: 'Bot' },
  { id: 'status-update', title: 'Status Update', description: 'Draft a client-facing project status update.', icon: 'FileText' },
];
export default function WordAssistantPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<WordAssistantTemplate | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);
  const [copied, setCopied] = useState(false);
  const mutation = useMutation({
    mutationFn: (params: { templateId: string; projectName: string }) => 
      api<GeneratedDocument>('/api/admin/word-assistant/generate', {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    onSuccess: (data) => {
      setGeneratedDoc(data);
      toast.success("Document generated successfully!");
    },
    onError: (err) => {
      toast.error(`Generation failed: ${err.message}`);
    }
  });
  const handleGenerate = () => {
    if (selectedTemplate && selectedProject) {
      const projectName = MOCK_PROJECTS.find(p => p.id === selectedProject)?.name || 'Selected Project';
      mutation.mutate({ templateId: selectedTemplate.id, projectName });
    } else {
      toast.warning("Please select a template and a project.");
    }
  };
  const handleCopy = () => {
    if (generatedDoc?.content) {
      navigator.clipboard.writeText(generatedDoc.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Word Assistant</h2>
        <p className="text-muted-foreground">AI-powered document generation for your projects.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Select a Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-3 border rounded-lg transition-colors ${selectedTemplate?.id === template.id ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}
                >
                  <p className="font-semibold">{template.title}</p>
                  <p className="text-sm opacity-80">{template.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Select a Project</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PROJECTS.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Button onClick={handleGenerate} disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? 'Generating...' : 'Generate Document'}
          </Button>
        </div>
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Document</CardTitle>
              {generatedDoc && (
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </div>
            <CardDescription>
              {generatedDoc ? generatedDoc.title : 'Your AI-generated document will appear here.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] border rounded-md p-4 bg-muted/50">
              {mutation.isPending ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {generatedDoc?.content || 'Select a template and project, then click "Generate Document".'}
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}