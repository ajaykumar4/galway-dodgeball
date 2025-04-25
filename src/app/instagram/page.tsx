'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import InstagramReelEmbed from '@/components/InstagramReelEmbed';
import {runInstagramScraper} from '@/services/instagram';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';

interface InstagramItem {
  type: 'reel' | 'post';
  href: string;
}

export default function InstagramPage() {
  const [items, setItems] = useState<InstagramItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInstagramFeed() {
      setIsLoading(true);
      setError(null);
      try {
        const scrapedItems = await runInstagramScraper();
        if (scrapedItems && scrapedItems.length > 0) {
          setItems(scrapedItems);
          console.log('Items length', scrapedItems.length);
        } else {
          console.warn("No Instagram posts found, using fallback items.");
          // Fallback data
          const fallbackItems: InstagramItem[] = [
            { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
            { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
            { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
            { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
          ];
          setItems(fallbackItems);
        }
      } catch (e: any) {
        console.error("Failed to load Instagram feed:", e);
        setError("Failed to load Instagram feed.");
        // Fallback data in case of error
        const fallbackItems: InstagramItem[] = [
          { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
          { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
          { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
          { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
        ];
        setItems(fallbackItems);
      } finally {
        setIsLoading(false);
      }
    }

    loadInstagramFeed();
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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">
              Instagram Feed
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Check out our latest posts on Instagram.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-8">
              {isLoading && <p>Loading Instagram feed...</p>}
              {error && (
                <p>
                  {error} Please check our{' '}
                  <Link
                    href="https://www.instagram.com/galwaydodgeball"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block"
                  >
                    Instagram page
                  </Link>{' '}
                  for more details.
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items && items.length > 0 &&
                  items.map((item, index) => (
                    <div key={index}>
                      {item.type === 'reel' ? (
                        <InstagramReelEmbed permalink={item.href} />
                      ) : (
                        <InstagramPostEmbed permalink={item.href} />
                      )}
                    </div>
                  ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
