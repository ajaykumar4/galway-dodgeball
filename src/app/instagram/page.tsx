'use server';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

async function getInstagramLinks() {
  const url = 'https://www.instagram.com/galwaydodgeball/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch Instagram page: ${response.status} ${response.statusText}`);
      // Handle 429 Too Many Requests error
      if (response.status === 429) {
        console.warn("Rate limited by Instagram. Consider implementing a delay or using a different approach.");
        return [];
      }
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

    return links.filter(link => link.startsWith('/galwaydodgeball/p/') || link.startsWith('/galwaydodgeball/reel/'));

  } catch (error) {
    console.error('Error fetching Instagram page:', error);
    return [];
  }
}

export default async function InstagramPage() {
  const reelUrl = "https://www.instagram.com/reel/C_d5wf3gHai/";
  const postUrl = "https://www.instagram.com/p/DGI3MrDs3Xc/";

  const items = Array(4).fill(reelUrl).concat(Array(4).fill(postUrl));

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                  <div key={index}>
                    <iframe
                      src={`${item}/embed`}
                      width="320"
                      height="440"
                      style={{ border: "none", overflow: "hidden" }}
                      scrolling="no"
                      allowtransparency="true"
                      allowfullscreen="true"
                    ></iframe>
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
