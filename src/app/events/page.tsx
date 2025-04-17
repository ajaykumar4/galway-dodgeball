
import { getUpcomingEvents } from "@/services/meetup";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Stay updated on our latest dodgeball events.</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            events.map((event) => (
              <Card key={event.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{event.time}</p>
                  <p>{event.description}</p>
                  <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                    Learn More
                  </a>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
