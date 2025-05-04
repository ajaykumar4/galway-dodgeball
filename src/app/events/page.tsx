
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

// Define a static fallback event structure if needed
type Event = {
  name: string;
  time: string;
  description: string;
  url: string;
}

export default async function EventsPage() {
  // Static fallback data or message since Redis/Meetup fetching is removed
  const events: Event[] = []; // Keep empty or add static example events if desired


  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        fill
        className="absolute -z-10 object-cover"
        data-ai-hint="dodgeball tournament"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 "></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">Upcoming Events</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Stay updated on our latest dodgeball events.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Display a message indicating where to find events */}
            <div className="text-center">
              Failed to load upcoming events. Please check our{' '}
              <Link
                href="https://www.meetup.com/galway-dodgeball-club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors inline-block"
              >
                Meetup page
              </Link>{' '}
              for more details.
            </div>
            {/* Optional: Keep the fallback rendering logic if you prefer */}
            {/*
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, index) => (
                  <Card key={index} className="mb-4 bg-transparent h-full flex flex-col">
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
              <div className="text-center">
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
            */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
