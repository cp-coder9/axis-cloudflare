import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MOCK_CLIENTS } from "@shared/mock-data";
export default function ClientSettingsPage() {
  const client = MOCK_CLIENTS[0];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account and notification preferences.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue={client.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input id="contact-person" defaultValue={client.contactPerson} />
              </div>
              <Button>Save Changes</Button>
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
                <Label htmlFor="n-milestone">Project Milestones</Label>
                <Switch id="n-milestone" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="n-message">New Messages</Label>
                <Switch id="n-message" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="n-file">New Files Added</Label>
                <Switch id="n-file" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}