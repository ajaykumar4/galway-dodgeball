'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';

export default function TheGamePage() {
  return (
    <div className="relative  min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10 "
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0  "></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">The Game of Dodgeball</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Learn about the rules and how to play dodgeball.</CardDescription>
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
              <div className="flex items-center space-x-4 flex-wrap">
                <a
                  href="https://drive.google.com/file/d/1_lFtJZaN-W5XgNO8boK8ne1aJaQuT1kw/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity flex flex-col items-center"
                >
                  <img
                    src="https://www.dodgeballeurope.org/wp-content/uploads/2018/03/2-EDF-logo-horizontal.png"
                    alt="European Dodgeball Federation Rules"
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                  <span className="ml-2">EDF Rules</span>
                </a>
                <a
                  href="https://drive.google.com/file/d/1nkOw6O2DDwgw8CnHIqi7_0c_H_8lgx0z/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity flex flex-col items-center"
                  >
                  <img
                    src="https://worlddodgeballfederation.com/wdbf-content/uploads/2020/02/WDBF-Colour-Emblem-Updated-Logo.png"
                    alt="World Dodgeball Federation Rules"
                    width={200}
                    height={200}
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
