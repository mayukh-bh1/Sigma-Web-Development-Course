import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { deletePost } from '../../store/postsSlice';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`${process.env.API_URL}/api/posts/${id}`);
      dispatch(deletePost(parseInt(id)));
      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center mt-8">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center mt-8">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
          
          <div className="flex justify-between items-center text-gray-600 mb-6 pb-4 border-b">
            <span>By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>

          <div className="text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
            {post.content}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Back to Home
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Delete Post
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}