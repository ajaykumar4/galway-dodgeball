import Link from 'next/link';
import DarkThemeToggle from './DarkThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Galway Dodgeball
        </Link>
        <div className="flex space-x-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/the-game">The Game</Link>
          <Link href="/events">Events</Link>
          <Link href="/instagram">Instagram</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <DarkThemeToggle />
        </div>
      </div>
    </nav>
  );
}
