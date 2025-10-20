import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_TEAM_MEMBERS } from "@shared/mock-data";
export default function FreelancerSettingsPage() {
  const freelancer = MOCK_TEAM_MEMBERS[2];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your profile and notification preferences.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and professional details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={freelancer.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={freelancer.email} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." defaultValue="Creative and detail-oriented Interior Designer..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Hourly Rate (R)</Label>
                <Input id="rate" type="number" defaultValue={850} />
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="n-messages">New Messages</Label>
                <Switch id="n-messages" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="n-projects">New Projects Available</Label>
                <Switch id="n-projects" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="n-payments">Payment Updates</Label>
                <Switch id="n-payments" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}