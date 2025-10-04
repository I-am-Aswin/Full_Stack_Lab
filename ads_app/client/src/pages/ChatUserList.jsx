import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChatUserList({ user }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    axios.get('/api/users').then(res => {
      setUsers(res.data.filter(u => u._id !== user.id));
    });
  }, [user]);

  if (!user) return <div className="text-center mt-10">Please login to view chats.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4 text-[var(--accent)]">Start a Chat</h2>
      <div className="grid gap-3">
        {users.map(u => (
          <div key={u._id} className="flex items-center gap-4 p-3 bg-base-100 shadow rounded cursor-pointer hover:bg-base-200" onClick={() => navigate(`/chat?to=${u._id}`)}>
            <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] font-semibold">{u.name[0]}</div>
            <div className="flex-1">
              <div className="font-medium">{u.name}</div>
              <div className="text-xs text-base-content/70">{u.email}</div>
            </div>
            <button className="btn btn-xs btn-outline border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
}
