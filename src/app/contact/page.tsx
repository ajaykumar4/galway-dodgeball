'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {MapPin, Clock} from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">Contact Us</CardTitle>
            <CardDescription className="text-muted-foreground">Get in touch or join our community.</CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                <MapPin className="h-5 w-5" /> <span>Address</span>
              </h2>
              <p> [Your Location Here]</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                <Clock className="h-5 w-5" /> <span>Timing</span>
              </h2>
              <p>Every Tuesday, 7:30 PM to 9:00 PM</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Join Our Community</h2>
              <p className="mb-4">
                Connect with us and other players through our WhatsApp community group:
              </p>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary block rounded-md bg-accent p-2 hover:bg-accent-foreground/10 transition-colors"
              >
                Join WhatsApp Community
              </a>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
