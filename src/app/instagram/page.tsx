'use server';

import Link from 'next/link';
import Image from 'next/image';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import InstagramReelEmbed from '@/components/InstagramReelEmbed';
import {getCachedData} from '@/services/redis';

interface InstagramItem {
  type: 'reel' | 'post';
  href: string;
}

const INSTAGRAM_CACHE_KEY = 'instagram_feed';

async function getInstagramFeedFromRedis(): Promise<InstagramItem[]> {
  try {
    const cachedData = await getCachedData(INSTAGRAM_CACHE_KEY);
    if (cachedData) {
      console.log('Using cached Instagram data');
      return JSON.parse(cachedData);
    } else {
      console.warn('No Instagram data found in Redis.');
      return [];
    }
  } catch (error: any) {
    console.error('Error fetching Instagram data from Redis:', error);
    return [];
  }
}

export default async function InstagramPage() {
  const items = await getInstagramFeedFromRedis();

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
        <div className="relative bg-transparent z-10 border-none shadow-none">
          <div>
            <div className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">
              Instagram Feed
            </div>
            <div className="text-muted-foreground text-center">
              Check out our latest posts on Instagram.
            </div>
          </div>
          <div>
            <section className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <div key={index}>
                      {item.type === 'reel' ? (
                        <InstagramReelEmbed permalink={item.href} />
                      ) : (
                        <InstagramPostEmbed permalink={item.href} />
                      )}
                    </div>
                  ))
                ) : (
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

