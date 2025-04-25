'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InstagramPostEmbed from '@/components/InstagramPostEmbed';
import InstagramReelEmbed from '@/components/InstagramReelEmbed';
import {getInstagramPosts} from '@/services/redis';


type InstagramPost = {
    url: string;
    type: 'reel' | 'post';
};


function InstagramPostList() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getInstagramPosts();
          setPosts(data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }, []);
  
    if (isLoading) {
        return <div>Loading...</div>;
    }
  
    if (error) {
        return <div>Error: {error.message}</div>;
    }
  
    if (!posts || posts.length === 0) {
        return <div>No Instagram posts found.</div>;
      }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index}>
              {post.type === 'reel' ? (
                <InstagramReelEmbed permalink={post.url} />
              ) : (
                <InstagramPostEmbed permalink={post.url} />
              )}
            </div>
          ))}
        </div>
  );
}

export default function InstagramPage() {
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
                <InstagramPostList/>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
