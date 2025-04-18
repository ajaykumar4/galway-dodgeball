'use client';

import Link from 'next/link';
import DarkThemeToggle from './DarkThemeToggle';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" className="text-xl font-bold flex items-center">
          <Image
            src="/galway-dodgeball-logo.png"
            width={30}
            height={30}
            alt="Galway Dodgeball Logo"
            className="mr-2 rounded-full"
          />
          Galway Dodgeball
        </Link>

        {/* Responsive Menu */}
        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-64">
              <div className="grid gap-4 py-4">
                <Link href="/" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/the-game" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>The Game</Link>
                <Link href="/events" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>Events</Link>
                <Link href="/instagram" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>Instagram</Link>
                <Link href="/about" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/contact" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <DarkThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-2 items-center flex-wrap">
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

