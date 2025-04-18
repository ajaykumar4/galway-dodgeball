
import {getInstagramFeed} from '@/services/instagram';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';

export default async function InstagramPage() {
  const posts = await getInstagramFeed();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Dodgeball Background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full -z-10 rounded-lg"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0 rounded-lg"></div>
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">Instagram Feed</CardTitle>
            <CardDescription className="text-muted-foreground">Check out our latest posts on Instagram.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map(post => (
                <Card key={post.id} className="bg-transparent">
                  <CardHeader>
                    <CardTitle>{post.caption}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={post.imageUrl} alt={post.caption} className="mb-2 rounded-md" />
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      View on Instagram
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
