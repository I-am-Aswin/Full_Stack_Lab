
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Profile({ userId }) {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const id = params.id || userId;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(res.data);
        setIsFollowing(res.data.followers.some(f => f._id === userId));
      } catch (err) {
        setError('Failed to load profile' + err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/posts/feed', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(res.data.filter(p => p.author._id === id));
      } catch (err) {
        setError('Failed to load posts' + err.message);
      }
    };
    fetchProfile();
    fetchPosts();
  }, [id, userId]);

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/users/${id}/follow`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIsFollowing(true);
      setProfile({ ...profile, followers: [...profile.followers, { _id: userId }] });
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setFollowLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/users/${id}/unfollow`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIsFollowing(false);
      setProfile({ ...profile, followers: profile.followers.filter(f => f._id !== userId) });
    } finally {
      setFollowLoading(false);
    }
  };

  if (error) return <div className="text-center mt-8">{error}</div>;
  if (loading || !profile) return <div className="text-center mt-8">Loading...</div>;

  const isOwnProfile = userId === id;

  return (
    <div className="max-w-xl mx-auto py-8">
  <div className="card bg-white/95 shadow p-6 mb-6 border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar placeholder">
            <div className="bg-emerald-600 text-white rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold">{profile.username[0]}</span>
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-600">{profile.username}</div>
            <div className="text-gray-500">{profile.email}</div>
          </div>
          {!isOwnProfile && (
            isFollowing ? (
              <button className="btn btn-outline ml-4 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-colors" onClick={handleUnfollow} disabled={followLoading}>
                Unfollow
              </button>
            ) : (
              <button className="btn bg-emerald-600 ml-4 text-white border-none hover:bg-emerald-700 transition-colors" onClick={handleFollow} disabled={followLoading}>
                Follow
              </button>
            )
          )}
        </div>
        <div className="mb-2 text-gray-800">{profile.bio}</div>
        <div className="flex gap-4 text-sm text-gray-700">
          <span>{profile.followers.length} Followers</span>
          <span>{profile.following.length} Following</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Posts</h3>
        {posts.length === 0 ? (
          <div className="text-gray-400">No posts yet.</div>
        ) : (
            <ul className="space-y-4">
            {posts.map(post => (
              <ProfilePost
                key={post._id}
                post={post}
                isOwn={isOwnProfile}
                onUpdate={() => {
                  axios.get('http://localhost:3000/api/posts/feed', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                  }).then(res => setPosts(res.data.filter(p => p.author._id === id)));
                }}
                username={profile.username}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ProfilePost({ post, isOwn, onUpdate, username }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setTitle(post.title);
    setDescription(post.description);
  };
  const handleSave = async () => {
    setLoading(true);
    await axios.put(`http://localhost:3000/api/posts/${post._id}`, { title, description }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setEditing(false);
    setLoading(false);
    onUpdate();
  };
  const handleDelete = async () => {
    setLoading(true);
    await axios.delete(`http://localhost:3000/api/posts/${post._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setLoading(false);
    onUpdate();
  };
  return (
    <li className="card bg-white/95 border border-gray-100 shadow-sm p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <div className="avatar placeholder">
          <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <span>{username[0]}</span>
          </div>
        </div>
        <span className="font-bold text-emerald-600">{username}</span>
        <span className="text-xs text-gray-400 ml-2">{new Date(post.createdAt).toLocaleString()}</span>
        {isOwn && !editing && (
          <>
            <button className="btn btn-xs btn-ghost ml-auto text-emerald-600 hover:bg-emerald-50" onClick={handleEdit}>Edit</button>
            <button className="btn btn-xs btn-error ml-2" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      {editing ? (
        <div className="flex flex-col gap-2">
          <input
            className="input input-bordered border-gray-200 focus:border-emerald-400 bg-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
          />
          <textarea
            className="textarea textarea-bordered border-gray-200 focus:border-emerald-400 bg-white"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={1000}
          />
          <div className="flex gap-2 mt-2">
            <button className="btn bg-emerald-600 btn-sm text-white border-none hover:bg-emerald-700 transition-colors" onClick={handleSave} disabled={loading}>Save</button>
            <button className="btn btn-ghost btn-sm text-emerald-600 hover:bg-emerald-50" onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="font-bold text-lg mb-1 text-emerald-600">{post.title}</div>
          <div className="text-gray-700">{post.description}</div>
        </>
      )}
    </li>
  );
}
