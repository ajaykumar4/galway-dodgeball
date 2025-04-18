'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-10">
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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">Welcome to Galway Dodgeball!</CardTitle>
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
            <div className="flex justify-center mt-6 space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </a>
              <a
                href="https://www.meetup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M19 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" /><path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" /><path d="M22 10h-3l-2-2-4 4 2 2 5-5 2 2z" /></svg>
                Meetup
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
