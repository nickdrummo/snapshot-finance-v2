import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">Snapshot Finance</div>
      <div className="flex space-x-6">
        <Link href="#about" className="hover:text-blue-600 transition">About</Link>
        <Link href="#pricing" className="hover:text-blue-600 transition">Pricing</Link>
        <Link href="/snapshot" className="hover:text-blue-600 transition">Snapshot</Link>
      </div>
    </nav>
  );
}