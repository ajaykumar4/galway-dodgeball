
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Removed InstagramPostEmbed and InstagramReelEmbed imports
// Removed runInstagramScraper import and related useEffect/useState

export default function InstagramPage() {
  // No state needed as we're not fetching data dynamically anymore

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        layout="fill" // Use layout="fill" for Next.js 13+ Image component
        objectFit="cover" // Ensure the image covers the container
        className="absolute top-0 left-0 w-full h-full -z-10 rounded-md"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 rounded-md"></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">
              Instagram Feed
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Check out our latest posts on Instagram.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Removed the grid and mapping logic */}
            <div className="text-center">
              To see our latest Instagram posts, please visit our official{' '}
              <Link
                href="https://www.instagram.com/galwaydodgeball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 transition-colors inline-block"
              >
                Instagram page
              </Link>
              .
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
