'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  time: string;
  description: string;
  url: string;
}

export default function EventsPage() {
  const events: Event[] = [
    {
      id: '1',
      name: 'Galway Dodgeball - Weekly Session',
      time: 'Every Tuesday, 7:30 PM',
      description: 'Join us for our weekly dodgeball session. All skill levels welcome!',
      url: 'https://www.meetup.com/galway-dodgeball-club',
    },
    {
      id: '2',
      name: 'Beginner Dodgeball Workshop',
      time: 'Saturday, May 6th, 2:00 PM',
      description: 'A workshop for those new to dodgeball. Learn the basics and have some fun!',
      url: 'https://www.meetup.com/galway-dodgeball-club',
    },
    {
      id: '3',
      name: 'Advanced Dodgeball Clinic',
      time: 'Sunday, May 14th, 10:00 AM',
      description: 'For experienced players looking to improve their skills and strategy.',
      url: 'https://www.meetup.com/galway-dodgeball-club',
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10 rounded-md"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 rounded-md"></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">Upcoming Events</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Stay updated on our latest dodgeball events.</CardDescription>
          </CardHeader>
          <CardContent>
            {events && events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                  <Card key={event.id} className="mb-4 bg-transparent h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between">
                      <div>
                        <p className="mb-2">{event.time}</p>
                        <p className="mb-2">{event.description}</p>
                      </div>
                      <Link href={event.url} className="text-primary">
                        Learn More
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
