import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_PROJECTS, MOCK_TEAM_MEMBERS } from "@shared/mock-data";
import { Search as SearchIcon, Folder, User, FileText } from "lucide-react";
export default function AdminSearchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Global Search</h2>
        <p className="text-muted-foreground">Find anything across your entire workspace.</p>
      </div>
      <div className="flex items-start gap-8">
        <Card className="w-1/4 sticky top-24">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Content Type</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="filter-projects" defaultChecked />
                <Label htmlFor="filter-projects">Projects</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="filter-team" defaultChecked />
                <Label htmlFor="filter-team">Team Members</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="filter-files" />
                <Label htmlFor="filter-files">Files</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="w-3/4 space-y-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for projects, team members, files..." className="pl-10 h-12 text-lg" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Showing results for "Tower"</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Projects</h3>
                {MOCK_PROJECTS.filter(p => p.name.includes("Tower")).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.client.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Team Members</h3>
                {MOCK_TEAM_MEMBERS.slice(0, 2).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}