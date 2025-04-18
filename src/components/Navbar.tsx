
import Link from 'next/link';
import DarkThemeToggle from './DarkThemeToggle';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" className="text-xl font-bold flex items-center">
          <Image
            src="/galway-dodgeball-logo.png"
            alt="Galway Dodgeball Logo"
            width={30}
            height={30}
            className="mr-2 rounded-full"
          />
          Galway Dodgeball
        </Link>
        <div className="flex space-x-2 items-center flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/the-game" className="hover:text-primary transition-colors">The Game</Link>
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link href="/instagram" className="hover:text-primary transition-colors">Instagram</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <DarkThemeToggle />
        </div>
      </div>
    </nav>
  );
}

