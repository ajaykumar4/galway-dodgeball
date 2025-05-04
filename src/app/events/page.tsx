
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import { getMeetupEvents, MeetupEvent } from '@/services/redis';
import Image from 'next/image';
import Link from 'next/link';

type Event = {
  name: 'Dodgeball';
  time: string;
  description: 'OUR LADY\'S BOYS CLUB, 11 Ely Place, Sea Road, Galway, Ireland, H91 R3K6';
  url: string;
}

export default async function EventsPage() {
  let events: Event[] = [];
  let error: Error | null = null;

  try {
    const meetupEvents: MeetupEvent[] | null = await getMeetupEvents();

    if (meetupEvents) {
      events = meetupEvents.map(event => ({
        name: 'Dodgeball',
        time: event.time,
        description: 'OUR LADY\'S BOYS CLUB, 11 Ely Place, Sea Road, Galway, Ireland, H91 R3K6',
        url: event.href
      }));
    } else {
       error = new Error("Failed to load events from Redis or data was null.");
    }
  } catch (err) {
    console.error("Error fetching Meetup events:", err);
    error = err instanceof Error ? err : new Error(String(err));
  }


  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        fill
        className="absolute -z-10 rounded-md object-cover"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 rounded-md"></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">Upcoming Events</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Stay updated on our latest dodgeball events.</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <Card key={event.url} className="mb-4 bg-transparent h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between">
                      <div>
                        <p className="mb-2">{event.time}</p>
                        <p className="mb-2">{event.description}</p>
                      </div>
                      <Link href={event.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block">
                        Learn More on Meetup
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div>
                Failed to load upcoming events. Please check our{' '}
                <Link
                  href="https://www.meetup.com/galway-dodgeball-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block"
                >
                  Meetup page
                </Link>{' '}
                for more details.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
