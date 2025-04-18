'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {Facebook, Instagram, X} from 'simple-icons-react';

function MeetupIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" viewBox="0 0 26 17" fill="none" className="mr-2 h-5 w-5 injected-svg text-meetupRed fill-current" data-src="https://secure.meetupstatic.com/next/images/design-system-icons/meetup-plus.svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-icon="icon-10326">
      <title>icon</title>
      <path d="M19.1613 14.9157C18.9321 13.4313 16.2209 14.576 16.0535 12.9496C15.8167 10.6417 19.2016 5.66776 18.9345 3.73681C18.6946 1.99845 17.5391 1.63425 16.5338 1.61635C15.5571 1.59846 15.2991 1.75634 14.969 1.95096C14.7785 2.06283 14.5049 2.28455 14.125 1.91826C13.8725 1.67461 13.7057 1.50401 13.4387 1.28793C13.3026 1.17754 13.0859 1.03862 12.723 0.984472C12.3597 0.93032 11.8895 0.984473 11.5908 1.11424C11.2914 1.24448 11.0566 1.47179 10.8106 1.6884C10.5652 1.90501 9.94185 2.6125 9.36081 2.35143C9.10887 2.2386 8.25566 1.80639 7.63987 1.53616C6.45113 1.01461 4.73669 1.85953 4.11943 2.97213C3.20075 4.6272 1.38707 11.13 1.11243 11.9877C0.496638 13.9136 1.89301 15.4834 3.77621 15.3929C4.57244 15.3546 5.10206 15.0598 5.60502 14.1327C5.89577 13.5973 8.62608 6.36758 8.82914 6.02073C8.97633 5.7694 9.46762 5.43735 9.8844 5.65396C10.3007 5.87058 10.3838 6.32211 10.3223 6.74766C10.2225 7.43571 8.29699 11.8462 8.22296 12.3453C8.09745 13.1937 8.49507 13.6658 9.36386 13.7117C9.95949 13.7439 10.5526 13.5268 11.0238 12.6262C11.2873 12.1225 14.3241 5.9573 14.5926 5.5456C14.888 5.09401 15.1254 4.9454 15.4262 4.96122C15.6595 4.97299 16.033 5.03374 15.9397 5.74277C15.848 6.43802 13.4065 10.9619 13.1504 12.0698C12.8078 13.5507 13.6095 15.0506 14.9304 15.707C15.7729 16.1255 19.4586 16.8426 19.1613 14.9157Z"></path>
      <path d="M24.5123 8.01966H22.7343C22.6766 8.01966 22.6297 7.96971 22.6297 7.9081V6.01164C22.6297 5.70361 22.3956 5.45386 22.1068 5.45386C21.818 5.45386 21.5839 5.70361 21.5839 6.01164V7.9081C21.5839 7.96971 21.5371 8.01966 21.4793 8.01966H19.7014C19.4126 8.01966 19.1785 8.26941 19.1785 8.57744C19.1785 8.88547 19.4126 9.13522 19.7014 9.13522H21.4793C21.5371 9.13522 21.5839 9.18517 21.5839 9.24678V11.1432C21.5839 11.4513 21.818 11.701 22.1068 11.701C22.3956 11.701 22.6297 11.4513 22.6297 11.1432V9.24678C22.6297 9.18517 22.6766 9.13522 22.7343 9.13522H24.5123C24.801 9.13522 25.0352 8.88547 25.0352 8.57744C25.0352 8.26941 24.801 8.01966 24.5123 8.01966Z"></path>
    </svg>
  );
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            <CardTitle className="text-3xl md:text-5xl font-bold text-foreground">Welcome to Galway Dodgeball!</CardTitle>
            <CardDescription className="text-muted-foreground">Your ultimate hub for all things dodgeball in Galway.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Galway Dodgeball is a vibrant and inclusive community where you can enjoy fun and exciting games of dodgeball.
            </p>
            <p className="mb-4">
              Whether you are a seasoned player or new to the sport, everyone is welcome to join us!
            </p>
            <p className="mb-4">
              We meet every Tuesday from 7:30 PM to 9:00 PM. It&apos;s a great way to stay active, meet new people, and have a blast.
            </p>
            <p>
              Explore our website to find out more about upcoming events, check out our Instagram feed, and learn about our community.
            </p>
            <div className="flex justify-center mt-6 space-x-4 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <Facebook size={24} className="mr-2" alt="Facebook icon" title="Facebook" />
                Facebook
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <X size={24} className="mr-2" alt="X.com icon" title="X"/>
                X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <Instagram size={24} className="mr-2" alt="Instagram icon" title="Instagram"/>
                Instagram
              </a>
              <a
                href="https://www.meetup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 transition-colors inline-flex items-center"
              >
                <MeetupIcon/>
                Meetup
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
