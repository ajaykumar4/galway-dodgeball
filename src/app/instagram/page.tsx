
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import InstagramReelEmbed from '@/components/InstagramReelEmbed';
import { getInstagramPosts, InstagramPost } from '@/services/redis';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default async function InstagramPage() {
  let posts: InstagramPost[] = [];
  let error: Error | null = null;

   try {
     const data = await getInstagramPosts();
     if (data) {
       posts = data;
     } else {
        error = new Error("Failed to load Instagram posts from Redis or data was null.");
     }
   } catch (err) {
     console.error("Error fetching Instagram posts:", err);
     error = err instanceof Error ? err : new Error(String(err));
   }

  // Fallback data if fetching fails or returns empty
  if (posts.length === 0) {
    console.warn("Using fallback Instagram data.");
     posts = [
      { type: 'reel', url: "https://www.instagram.com/reel/C_d5wf3gHai/" },
      { type: 'post', url: "https://www.instagram.com/p/DGI3MrDs3Xc/" },
      { type: 'reel', url: "https://www.instagram.com/reel/DIwaOGas0H1/" },
      { type: 'post', url: "https://www.instagram.com/p/DF51TPQMLdI/" },
      { type: 'reel', url: "https://www.instagram.com/reel/DIwXcLEM74N/" },
      { type: 'post', url: "https://www.instagram.com/p/DH4DUXosbmW/" },
    ];
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        fill
        className="absolute -z-10 rounded-md object-cover"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((item, index) => (
                  <div key={index} className="h-full"> {/* Ensure grid items take full height */}
                    {item.type === 'reel' ? (
                      <InstagramReelEmbed permalink={item.url} />
                    ) : (
                      <InstagramPostEmbed permalink={item.url} />
                    )}
                  </div>
                ))}
              </div>
               {error && ( // Display error message if fetching failed
                 <div className="mt-4 text-center">
                   Failed to load live Instagram feed. Showing recent posts. Please check our{' '}
                   <Link
                     href="https://www.instagram.com/galwaydodgeball"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block"
                   >
                     Instagram page
                   </Link>{' '}
                   for the latest updates.
                 </div>
               )}
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
