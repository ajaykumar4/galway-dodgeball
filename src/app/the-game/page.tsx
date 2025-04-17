'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';

export default function TheGamePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Dodgeball Background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full -z-10"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0"></div>
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">The Game of Dodgeball</CardTitle>
            <CardDescription className="text-muted-foreground">Learn about the rules and how to play dodgeball.</CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Playing Dodgeball</h2>
              <p>
                Dodgeball is a fast-paced and exciting game played between two teams. The objective is to eliminate all opposing
                players by hitting them with thrown dodgeballs, catching a dodgeball thrown by an opponent, or forcing an
                opponent to step outside the court boundaries.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">The Rules</h2>
              <p>
                While specific rules may vary depending on the league or organization, some common rules include:
              </p>
              <ul className="list-disc pl-5">
                <li>Players must stay within the court boundaries.</li>
                <li>A player is eliminated if hit by a thrown dodgeball that has not touched another player or surface.</li>
                <li>A player can catch a thrown dodgeball to eliminate the thrower.</li>
                <li>Headshots may be prohibited or have special rules.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Official Rules</h2>
              <p className="mb-4">
                Please click on the logos below to view and/or download a full set of EDF or WDBF rules.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://dodgeballfederation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity"
                >
                  <Image
                    src="https://dodgeballfederation.org/wp-content/uploads/2023/02/cropped-EDF_Logo_Black-192x192.png"
                    alt="European Dodgeball Federation Rules"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span className="ml-2">EDF Rules</span>
                </a>
                <a
                  href="https://www.worlddodgeballfederation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity"
                >
                  <Image
                    src="https://www.worlddodgeballfederation.com/wp-content/uploads/2023/09/WDBF-logo-sm.png"
                    alt="World Dodgeball Federation Rules"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span className="ml-2">WDBF Rules</span>
                </a>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
