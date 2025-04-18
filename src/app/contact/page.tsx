'use client';

import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {MapPin, Clock} from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  const address = 'OUR LADY\'S BOYS CLUB, 11 Ely Place, Sea Road, Galway, Ireland, H91 R3K6';
  // Correctly encode the address for the Google Maps URL
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m1!1s${encodedAddress}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b9a39498cbb9d%3A0x9e6840096859a6a9!2s11%20Ely%20Place!5e0!3m2!1sen!2sie!4v1729798074774!5m2!1sen!2sie`;
  const mapsUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`

  return (
    <div className="container mx-auto py-10 px-4">
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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">Contact Us</CardTitle>
            <CardDescription className="text-muted-foreground">Get in touch or join our community.</CardDescription>
          </CardHeader>
          <CardContent>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                <MapPin className="h-5 w-5" /> <span>Address</span>
              </h2>
              <p>{address}</p>
              <div className="mt-4">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="300"
                  className="max-w-full" // Added max-w-full for responsiveness
                  style={{border:0}}
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
              <h2 className="text-xl font-semibold mb-2">Join Our Community</h2>
              <p className="mb-4">
                Connect with us and other players through our WhatsApp community group:
              </p>
              <a

                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-block"
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
