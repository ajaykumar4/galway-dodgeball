
'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
          className="absolute top-0 left-0 w-full h-full -z-10"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0"></div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
