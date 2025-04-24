'use server';

import React from 'react';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import InstagramReelEmbed from '@/components/InstagramReelEmbed';
import Link from 'next/link';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';

export default async function InstagramPage() {
  const reels = Array(3).fill("https://www.instagram.com/reel/C_d5wf3gHai/");
  const posts = Array(3).fill("https://www.instagram.com/p/DGI3MrDs3Xc/");

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
              <h2 className="text-2xl font-semibold mb-4">Reels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reels.map((reel, index) => (
                  <div key={`reel-${index}`}>
                    <InstagramReelEmbed permalink={reel} />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post, index) => (
                  <div key={`post-${index}`}>
                    <InstagramPostEmbed permalink={post} />
                  </div>
                ))}
              </div>
            </section>
            {(posts.length === 0 && reels.length === 0) && (
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
