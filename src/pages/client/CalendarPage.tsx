import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { MOCK_CALENDAR_EVENTS } from "@shared/mock-data";
import { Badge } from "@/components/ui/badge";
import { Milestone, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
export default function ClientCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const eventsForSelectedDate = date 
    ? MOCK_CALENDAR_EVENTS.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
    : [];
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
        <p className="text-muted-foreground">View project milestones and upcoming meetings.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
              modifiers={{
                events: MOCK_CALENDAR_EVENTS.map(e => new Date(e.date))
              }}
              modifiersStyles={{
                events: {
                  color: 'hsl(var(--primary-foreground))',
                  backgroundColor: 'hsl(var(--primary))',
                }
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Events for {date ? format(date, "PPP") : "..."}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsForSelectedDate.map(event => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      {event.type === 'milestone' ? <Milestone className="h-5 w-5 text-primary" /> : <CalendarIcon className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <Badge variant={event.type === 'milestone' ? 'default' : 'secondary'}>{event.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}