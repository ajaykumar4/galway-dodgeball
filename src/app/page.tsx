
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Galway Dodgeball!</CardTitle>
          <CardDescription>Your ultimate hub for all things dodgeball in Galway.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Galway Dodgeball is a vibrant and inclusive community where you can enjoy fun and exciting games of dodgeball.
            Whether you are a seasoned player or new to the sport, everyone is welcome to join us!
          </p>
          <p className="mt-4">
            We meet every Tuesday from 7:30 PM to 9:00 PM. It's a great way to stay active, meet new people, and have a blast.
          </p>
          <p className="mt-4">
            Explore our website to find out more about upcoming events, check out our Instagram feed, and learn about our community.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
