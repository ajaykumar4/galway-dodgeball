'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SiFacebook, SiInstagram, SiX, SiMeetup } from 'react-icons/si';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative  min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10 rounded-lg"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 rounded-lg"></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">
              <Image
                src="/galway-dodgeball-logo.png"
                width={40}
                height={40}
                className="mr-2 rounded-full"
                alt="Galway Dodgeball Logo"
              />
              Welcome to Galway Dodgeball!
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">Your go-to spot for all things dodgeball in Galway 🎯</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              Galway Dodgeball is a vibrant, inclusive community where everyone&apos;s welcome&mdash;whether you&apos;ve played for years or you&apos;ve never touched a dodgeball in your life. If you&apos;re new to Galway and looking to meet people, stay active, and have some fun, this is the perfect place to start.
            </p>
            <p className="mb-4 text-center">
              We play every Tuesday from 7:30 PM to 9:00 PM.
            </p>
            <p className="mb-4 text-center">
              No experience? No problem! Just show up in comfortable clothes and runners&mdash;we&apos;ll take care of the rest.
            </p>
            <p className="text-center">
              Explore our community, get updates on upcoming events, and see what we&apos;re all about:
            </p>
            <div className="flex justify-center mt-6 space-x-4 flex-wrap">
              <a
                href="https://www.facebook.com/GalwayDodgeball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiFacebook className="mr-2 h-5 w-5" alt="Facebook icon" title="Facebook" />
                Facebook
              </a>
              <a
                href="https://x.com/dodgeballgalway"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiX className="mr-2 h-5 w-5" alt="X icon" title="X" />
                X
              </a>
              <a
                href="https://www.instagram.com/galwaydodgeball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiInstagram className="mr-2 h-5 w-5" alt="Instagram icon" title="Instagram" />
                Instagram
              </a>
              <a
                href="https://www.meetup.com/galway-dodgeball-club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <SiMeetup className="mr-2 h-5 w-5" alt="Meetup icon" title="Meetup" />
                Meetup
              </a>
            </div>
            <p className="text-center">
              Come join the fun &mdash; we&apos;d love to meet you!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
