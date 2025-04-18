'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import Image from 'next/image';

export default function AboutPage() {
  const communityMembers = [
    {
      name: 'John Doe',
      role: 'Founder',
      imageUrl: 'https://picsum.photos/100/100', // Placeholder image
    },
    {
      name: 'Jane Smith',
      role: 'Team Lead',
      imageUrl: 'https://picsum.photos/100/100', // Placeholder image
    },
    {
      name: 'David Lee',
      role: 'Player',
      imageUrl: 'https://picsum.photos/100/100', // Placeholder image
    },
  ];

  return (
    <div className="container mx-auto py-10">
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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">About Galway Dodgeball</CardTitle>
            <CardDescription className="text-muted-foreground">Learn more about our community and mission.</CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Our Story</h2>
              <p>
                Galway Dodgeball is more than just a sports club; it's a community. We are passionate about dodgeball and
                committed to creating a welcoming and inclusive environment for players of all skill levels.
              </p>
              <p className="mt-2">
                Our community members come from diverse backgrounds, united by their love for the game and the camaraderie it
                fosters.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
              <p>
                To promote dodgeball as a fun, accessible, and engaging activity for everyone in Galway, building a strong and
                supportive community.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Community Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
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
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
