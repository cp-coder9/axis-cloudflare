import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Notification } from "@shared/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, DollarSign, MessageSquare, FolderKanban, AlertCircle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
const iconMap = {
  payment: DollarSign,
  message: MessageSquare,
  project: FolderKanban,
  alert: AlertCircle,
  info: Info,
  milestone: Bell,
};
const NotificationItem = ({ notification }: { notification: Notification }) => {
  const Icon = iconMap[notification.type] || Bell;
  return (
    <div className={cn("flex items-start gap-4 p-4 border-l-4", !notification.isRead && "bg-accent/50 border-primary")}>
      <Icon className="h-5 w-5 text-muted-foreground mt-1" />
      <div className="flex-1">
        <p className="font-medium">{notification.title}</p>
        <p className="text-sm text-muted-foreground">{notification.description}</p>
        <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</p>
      </div>
    </div>
  );
};
export default function ClientNotificationsPage() {
  const { data, isLoading, error } = useQuery<Notification[]>({
    queryKey: ['notifications', 'client'],
    queryFn: () => api('/api/notifications?role=client'),
  });
  const notifications = data || [];
  const unreadCount = notifications.filter(n => !n.isRead).length;
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">You have {unreadCount} unread notifications.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : error ? (
            <div className="text-center text-red-500 p-8">Failed to load notifications.</div>
          ) : (
            <div className="divide-y">
              {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}