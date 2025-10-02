
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/posts/feed', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    await axios.post('http://localhost:3000/api/posts', { title, description }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTitle('');
    setDescription('');
    fetchFeed();
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      {/* Enhanced Post Submission Card */}
  <div className="card bg-white/95 border border-gray-100 shadow-sm mb-8 rounded-xl">
        <form onSubmit={handlePost} className="card-body flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="avatar placeholder">
              <div className="bg-emerald-600 text-white rounded-full w-9 h-9 flex items-center justify-center">
                <span className="text-base font-bold">U</span>
              </div>
            </div>
            <span className="text-sm text-emerald-600 font-semibold">Add a new post</span>
          </div>
          <input
            className="input input-bordered border-gray-200 focus:border-emerald-400 text-base bg-white"
            placeholder="Title (max 100 chars)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
            required
          />
          <textarea
            className="textarea textarea-bordered border-gray-200 focus:border-emerald-400 min-h-[70px] text-base bg-white"
            placeholder="What's on your mind? (max 1000 chars)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={1000}
            required
          />
          <button className="btn btn-emerald-600 btn-sm self-end mt-1 bg-emerald-600 text-white border-none hover:bg-emerald-700 transition-colors px-6" type="submit">
            <span className="font-semibold tracking-wide">Post</span>
          </button>
        </form>
      </div>
      {/* Feed List */}
      {loading ? <div className="text-center">Loading...</div> : (
        <ul className="space-y-4">
          {posts.length === 0 && <div className="text-center text-gray-400">No posts yet.</div>}
          {posts.map(post => (
            <li key={post._id} className="card bg-white/95 border border-gray-100 shadow-sm p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar placeholder">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span>{post.author.username[0]}</span>
                  </div>
                </div>
                <Link to={`/profile/${post.author._id || post.author.id}`} className="font-bold text-emerald-600 hover:underline">
                  {post.author.username}
                </Link>
                <span className="text-xs text-gray-400 ml-2">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <div className="font-bold text-lg mb-1 text-gray-800">{post.title}</div>
              <div className="text-gray-700">{post.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
