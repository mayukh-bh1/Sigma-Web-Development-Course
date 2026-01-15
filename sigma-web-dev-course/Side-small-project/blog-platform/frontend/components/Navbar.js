import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            My Blog
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link href="/create" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}