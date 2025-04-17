
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
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
          <p>
            Our community is made up of students, professionals, and dodgeball enthusiasts who share a common interest in having fun and staying active.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
