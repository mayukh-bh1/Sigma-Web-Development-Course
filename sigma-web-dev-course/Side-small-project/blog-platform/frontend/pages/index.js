import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { setPosts, setLoading } from '../store/postsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${process.env.API_URL}/api/posts`);
      dispatch(setPosts(response.data));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Welcome to My Blog
        </h1>
        
        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}