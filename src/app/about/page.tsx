
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {
  const communityMembers = [
    {
      name: "John Doe",
      role: "Founder",
      imageUrl: "https://picsum.photos/100/100", // Placeholder image
    },
    {
      name: "Jane Smith",
      role: "Team Lead",
      imageUrl: "https://picsum.photos/100/100", // Placeholder image
    },
    {
      name: "David Lee",
      role: "Player",
      imageUrl: "https://picsum.photos/100/100", // Placeholder image
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>About Galway Dodgeball</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Galway Dodgeball is more than just a sports club; it's a community. We are passionate about dodgeball and committed to creating a welcoming and inclusive environment for players of all skill levels.
          </p>
          <p className="mt-4">
            Our community members come from diverse backgrounds, united by their love for the game and the camaraderie it fosters.
          </p>
          <h2 className="text-xl font-semibold mt-6">Our Mission</h2>
          <p>
            To promote dodgeball as a fun, accessible, and engaging activity for everyone in Galway, building a strong and supportive community.
          </p>
          <h2 className="text-xl font-semibold mt-6">Community Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {communityMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
