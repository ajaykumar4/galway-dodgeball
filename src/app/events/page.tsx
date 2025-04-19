'use client';

import {getUpcomingEvents} from '@/services/meetup';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="relative  min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10 "
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0  "></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">Upcoming Events</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Stay updated on our latest dodgeball events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events && events.length > 0 ? (
                events.map(event => (
                  <Card key={event.id} className="mb-4 bg-transparent">
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{event.time}</p>
                      <p>{event.description}</p>
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        Learn More
                      </a>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>
                  No upcoming events found. Please check our{' '}
                  <Link
                    href="https://www.meetup.com/galway-dodgeball-club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    Meetup page
                  </Link>{' '}
                  for more details.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
