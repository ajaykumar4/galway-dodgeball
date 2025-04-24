'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import InstagramReelEmbed from '@/components/InstagramReelEmbed';

interface InstagramItem {
  type: 'reel' | 'post';
  href: string;
}

export default function InstagramPage() {
  const items: InstagramItem[] = [
    { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
    { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
    { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
    { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
    { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
    { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
    { type: 'reel', href: "https://www.instagram.com/reel/C_d5wf3gHai/" },
    { type: 'post', href: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
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
                {items.map((item, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

