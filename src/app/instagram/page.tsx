'use server';

import React from 'react';
import InstagramEmbed from '@/components/InstagramEmbed';
import Link from 'next/link';
import Image from 'next/image';

async function getInstagramLinks() {
  const url = 'https://www.instagram.com/galwaydodgeball/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch Instagram page: ${response.status} ${response.statusText}`);
      return [];
    }

    const html = await response.text();
    const regex = /<article.*?<\/article>/g;
    const articles = (html.match(regex) || []);
    const links: string[] = [];

    articles.forEach(article => {
      const linkRegex = /<a.*?href="(.*?)".*?>/g;
      let match;
      while ((match = linkRegex.exec(article)) !== null) {
        links.push(match[1]);
      }
    });

    const posts = links.filter(link => link.startsWith('/galwaydodgeball/p/'));
    const reels = links.filter(link => link.startsWith('/galwaydodgeball/reel/'));
    return posts.concat(reels);

  } catch (error) {
    console.error('Error fetching Instagram page:', error);
    return [];
  }
}

export default async function InstagramPage() {
  const links = await getInstagramLinks();

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
          <div >
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
                {links && links.length > 0 ? (
                  links.slice(0, 6).map((link, index) => (
                    <div key={index}>
                      <InstagramEmbed permalink={`https://www.instagram.com${link}`} />
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
