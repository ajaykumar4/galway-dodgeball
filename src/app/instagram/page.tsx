'use server';

import {getInstagramFeed} from '@/services/instagram';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default async function InstagramPage() {
  const posts = await getInstagramFeed();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0"></div>
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
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                  <div key={post.id} className="bg-transparent">
                    <div dangerouslySetInnerHTML={{__html: post.embedHtml}} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                Failed to load Instagram feed. Please check our{' '}
                <Link
                  href="https://www.instagram.com/galwaydodgeball"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
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
