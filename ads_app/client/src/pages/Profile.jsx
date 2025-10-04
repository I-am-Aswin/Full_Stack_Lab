import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile({ user }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const uid = id || user?.id;
    if (!uid) return;
    axios.get(`/api/users/${uid}`)
      .then(res => setProfile(res.data))
      .catch(() => setError('User not found'));
  }, [id, user]);

  if (error) return <div className="text-center mt-10 text-error">{error}</div>;
  if (!profile) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-2xl text-[var(--accent)] font-bold">
            {profile.name[0]}
          </div>
          <div>
            <div className="font-bold text-lg">{profile.name}</div>
            <div className="text-base-content/70 text-sm">{profile.email}</div>
          </div>
        </div>
        <div className="mb-2">Joined: {new Date(profile.createdAt).toLocaleDateString()}</div>
        {user && user.id !== profile._id && (
          <button className="btn btn-outline border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white mt-2" onClick={() => navigate(`/chat?to=${profile._id}`)}>Chat with {profile.name}</button>
        )}
        {user && user.id === profile._id && (
          <button className="btn btn-sm mt-2" onClick={() => alert('Edit profile coming soon!')}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}
