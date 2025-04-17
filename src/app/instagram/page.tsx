
import { getInstagramFeed } from "@/services/instagram";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function InstagramPage() {
  const posts = await getInstagramFeed();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Instagram Feed</CardTitle>
          <CardDescription>Check out our latest posts on Instagram.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.caption}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={post.imageUrl} alt={post.caption} className="mb-2 rounded-md" />
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                    View on Instagram
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
