'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import {getInstagramLinks, InstagramItem} from '@/services/instagram';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';

export default function InstagramPage() {
  const [items, setItems] = useState<InstagramItem[]>([]);

  useEffect(() => {
    async function fetchInstagramFeed() {
      const feed = await getInstagramLinks();
      setItems(feed);
    }

    fetchInstagramFeed();
  }, []);

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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">Instagram Feed</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Check out our latest posts on Instagram.</CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <div key={index}>
                    <InstagramPostEmbed permalink={item.href} />
                  </div>
                ))}
              </div>
            </section>
            {items.length === 0 && (
              <div>
                Failed to load Instagram feed. Please check our{' '}
                <Link
                  href="https://www.instagram.com/galwaydodgeball"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block"
                >
                  Instagram page
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

