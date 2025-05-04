'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {MapPin, Clock, Mail} from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  const address = 'OUR LADY\'S BOYS CLUB, 11 Ely Place, Sea Road, Galway, Ireland, H91 R3K6';
  // Correctly encode the address for the Google Maps URL
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const emailAddress = 'galwaydodgeball@gmail.com'; // Replace with actual email if different

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Dodgeball Background"
        fill={true}
        priority // Add priority for LCP
        className="absolute top-0 left-0 w-full h-full -z-10 object-cover"
        data-ai-hint="dodgeball game"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-0"></div>
      <div className="container mx-auto py-10 px-4">
        <Card className="relative bg-transparent z-10 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center">Contact Us</CardTitle>
            <CardDescription className="text-muted-foreground text-center">Get in touch or find our location.</CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                <MapPin className="h-5 w-5" /> <span>Address</span>
              </h2>
              <p>{address}</p>
              <div className="mt-4 rounded-md overflow-hidden shadow-md">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Galway Dodgeball Location"
                ></iframe>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                <Clock className="h-5 w-5" /> <span>Timing</span>
              </h2>
              <p>Every Tuesday, 7:30 PM to 9:00 PM</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                <Mail className="h-5 w-5" /> <span>Contact by Email</span>
              </h2>
              <p className="mb-4">
                For inquiries, please send us an email:
              </p>
              <a
                href={`mailto:${emailAddress}`}
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block"
              >
                {emailAddress}
              </a>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
