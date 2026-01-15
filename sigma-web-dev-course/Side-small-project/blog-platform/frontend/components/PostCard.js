import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {post.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.content.substring(0, 150)}...
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {post.author}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <Link href={`/post/${post.id}`}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Read More
        </button>
      </Link>
    </div>
  );
}