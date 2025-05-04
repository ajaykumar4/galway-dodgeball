'use client';

import Link from 'next/link';
import DarkThemeToggle from './DarkThemeToggle';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"; // Added SheetTitle

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <Link href="/" className="text-xl font-bold flex items-center">
          <Image
            src="/galway-dodgeball-logo.png"
            width={40}
            height={40}
            alt="Galway Dodgeball Logo"
            className="mr-2 rounded-full"
            priority // Load logo quickly
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
            <SheetContent side="right" className="w-full sm:w-64 max-w-sm bg-background/80 backdrop-blur-md">
             <SheetTitle className="hidden">Mobile Navigation Menu</SheetTitle> {/* Added SheetTitle for accessibility */}
              <ul className="grid gap-4 py-4">
                <li><Link href="/" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link href="/the-game" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>The Game</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors block" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                <li><DarkThemeToggle /></li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center flex-wrap">
          <ul className="flex space-x-6 items-center"> {/* Changed div to ul */}
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/the-game" className="hover:text-primary transition-colors">The Game</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
          <DarkThemeToggle />
        </div>
      </div>
    </nav>
  );
}
