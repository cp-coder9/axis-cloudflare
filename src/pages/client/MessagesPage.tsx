import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_PROJECTS } from "@shared/mock-data";
import { ClientMessage } from "@shared/types";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
const messageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
});
type MessageFormData = z.infer<typeof messageSchema>;
export default function ClientMessagesPage() {
  const queryClient = useQueryClient();
  const projectContacts = MOCK_PROJECTS.filter(p => p.status === 'In Progress');
  const { data: messages, isLoading, error } = useQuery<ClientMessage[]>({
    queryKey: ['messages'],
    queryFn: () => api('/api/messages'),
  });
  const mutation = useMutation({
    mutationFn: (newMessage: MessageFormData) => api('/api/messages', {
      method: 'POST',
      body: JSON.stringify(newMessage),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      reset();
    },
    onError: (err) => {
      toast.error(`Failed to send message: ${err.message}`);
    }
  });
  const { register, handleSubmit, reset } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });
  const onSubmit = (data: MessageFormData) => {
    mutation.mutate(data);
  };
  return (
    <div className="space-y-8">
       <div>
          <h2 className="text-3xl font-bold tracking-tight">Communication</h2>
          <p className="text-muted-foreground">
            Stay in touch with your project team.
          </p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Team Contacts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-18rem)]">
              <div className="space-y-2 p-4">
              {projectContacts.map(project => (
                <div key={project.id} className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors bg-secondary">
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.team.map(t => t.name).join(', ')}</p>
                </div>
              ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Downtown Tower</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <ScrollArea className="h-[calc(100vh-22rem)] p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : error ? (
                <div className="text-center text-red-500">Failed to load messages.</div>
              ) : (
                <div className="space-y-4">
                  {messages?.map(msg => (
                    <div key={msg.id} className={cn("flex items-end gap-2", msg.isClient ? "justify-end" : "justify-start")}>
                      {!msg.isClient && <Avatar className="h-8 w-8"><AvatarImage src={msg.senderAvatar} /><AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback></Avatar>}
                      <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.isClient ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs text-right mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                       {msg.isClient && <Avatar className="h-8 w-8"><AvatarImage src={msg.senderAvatar} /><AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback></Avatar>}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
              <Input placeholder="Type a message..." {...register("text")} disabled={mutation.isPending} />
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}