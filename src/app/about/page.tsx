'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import Image from 'next/image';

export default function AboutPage() {
  const committeeMembers = [
    {
      name: 'Colin O\'Halloran',
      role: 'Chairman',
      imageUrl: '/committee/colin-ohalloran.jpg',
    },
    {
      name: 'Anne Liston',
      role: 'Secretary',
      imageUrl: '/committee/anne-liston.jpg',
    },
    {
      name: 'Katie',
      role: 'Treasurer',
      imageUrl: '/committee/katie.jpg',
    },
    {
      name: 'Alan Grace',
      role: 'P.R.O.',
      imageUrl: '/committee/alan-grace.jpg',
    },
    {
      name: 'Alex Potter',
      role: 'P.R.O.',
      imageUrl: '/committee/alex-potter.jpg',
    },
    {
      name: 'Andrea Berry Berardi',
      role: 'Coach',
      imageUrl: '/committee/andrea-berry.jpg',
    },
    {
      name: 'Edel Moran',
      role: 'Coach',
      imageUrl: '/committee/edel-moran.jpg',
    },
  ];

  return (
    <div className="relative  min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        fill={true}
        priority // Add priority for LCP
        className="absolute top-0 left-0 w-full h-full -z-10 object-cover"
        data-ai-hint="dodgeball action"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0  "></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">
              About Galway Dodgeball
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">Learn more about our community and mission.</CardDescription>
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
              <h2 className="text-xl font-semibold mb-2">Committee Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {committeeMembers.map((member, index) => (
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
