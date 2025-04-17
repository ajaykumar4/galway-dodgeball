
import { getInstagramFeed } from "@/services/instagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function InstagramPage() {
  const posts = await getInstagramFeed();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Instagram Feed</h1>
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
    </div>
  );
}
