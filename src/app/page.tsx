'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiMeetup,
} from 'react-icons/si';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Dodgeball Background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full -z-10 rounded-lg"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 rounded-lg"></div>
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center">
              <Image
                src="/galway-dodgeball-logo.png"
                width={50}
                height={50}
                alt="Galway Dodgeball Logo"
                className="mr-2 rounded-full"
              />
              Welcome to Galway Dodgeball!
            </CardTitle>
            <CardDescription className="text-muted-foreground">Your ultimate hub for all things dodgeball in Galway.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Galway Dodgeball is a vibrant and inclusive community where you can enjoy fun and exciting games of dodgeball.
            </p>
            <p className="mb-4">
              Whether you are a seasoned player or new to the sport, everyone is welcome to join us!
            </p>
            <p className="mb-4">
              We meet every Tuesday from 7:30 PM to 9:00 PM. It&apos;s a great way to stay active, meet new people, and have a blast.
            </p>
            <p>
              Explore our website to find out more about upcoming events, check out our Instagram feed, and learn about our community.
            </p>
            <div className="flex justify-center mt-6 space-x-4 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiFacebook className="mr-2 h-5 w-5" alt="Facebook icon" title="Facebook" />
                Facebook
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiX className="mr-2 h-5 w-5" alt="X icon" title="X" />
                X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiInstagram className="mr-2 h-5 w-5" alt="Instagram icon" title="Instagram" />
                Instagram
              </a>
              <a
                href="https://www.meetup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiMeetup className="mr-2 h-5 w-5" alt="Meetup icon" title="Meetup" />
                Meetup
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


    


