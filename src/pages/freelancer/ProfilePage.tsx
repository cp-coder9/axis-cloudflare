import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PROJECTS, MOCK_TEAM_MEMBERS } from "@shared/mock-data";
import { Mail, Phone, Star, Briefcase } from "lucide-react";
export default function FreelancerProfilePage() {
  const freelancer = MOCK_TEAM_MEMBERS[2]; // Using Sophie as an example
  const completedProjects = MOCK_PROJECTS.filter(p => p.status === 'Completed');
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="h-32 bg-muted" />
        <CardContent className="p-6 flex items-start gap-6 -mt-16">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={freelancer.avatarUrl} />
            <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="pt-16">
            <h2 className="text-2xl font-bold">{freelancer.name}</h2>
            <p className="text-muted-foreground">{freelancer.role}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Mail className="h-4 w-4" /> {freelancer.email}</div>
              <div className="flex items-center gap-1"><Phone className="h-4 w-4" /> {freelancer.phone}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Creative and detail-oriented Interior Designer with over 8 years of experience in residential and commercial projects. Passionate about creating functional and aesthetically pleasing spaces.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {['AutoCAD', 'SketchUp', '3ds Max', 'V-Ray', 'Space Planning', 'Concept Development'].map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Project History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {completedProjects.map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.client.name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4" /> 5.0
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}