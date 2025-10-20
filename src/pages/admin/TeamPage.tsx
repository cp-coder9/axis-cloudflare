import { api } from "@/lib/api-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: 'Admin' | 'Freelancer' | 'Client';
  avatarUrl: string;
  email: string;
  phone: string;
}

export default function AdminTeamPage() {
  const { data: teamMembers, isLoading, isError } = useQuery<TeamMember[]>({
    queryKey: ['teamMembers'],
    queryFn: () => api('/api/team')
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">
            Manage your team members and their roles.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="flex flex-col animate-pulse">
            <CardHeader className="items-center text-center">
              <div className="h-24 w-24 rounded-full bg-muted mb-4"></div>
              <div className="h-6 w-32 bg-muted rounded"></div>
              <div className="h-5 w-16 bg-muted rounded mt-1"></div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-muted rounded"></div>
                <div className="h-4 w-48 bg-muted rounded"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-muted rounded"></div>
                <div className="h-4 w-32 bg-muted rounded"></div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 w-full bg-muted rounded"></div>
            </CardFooter>
          </Card>
        ))}
        {isError && <p className="text-destructive col-span-full">Failed to load team members.</p>}
        {teamMembers?.map((member) => (
          <Card key={member.id} className="flex flex-col">
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={member.avatarUrl} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle>{member.name}</CardTitle>
              <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>{member.role}</Badge>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}