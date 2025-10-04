import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Messages({ user }) {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    axios.get('/api/messages/conversations').then(res => setConversations(res.data));
  }, [user]);

  if (!user) return <div className="text-center mt-10">Please login to view messages.</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[var(--accent)]">Messages</h2>
      <div className="divide-y divide-base-300">
        {conversations.map(conv => (
          <div key={conv.user._id} className="flex items-center gap-4 py-4 cursor-pointer hover:bg-base-200 rounded" onClick={() => navigate(`/chat/${conv.user._id}`)}>
            <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] font-semibold">{conv.user.name[0]}</div>
            <div className="flex-1">
              <div className="font-medium">{conv.user.name}</div>
              <div className="text-xs text-base-content/70 truncate">{conv.lastMessage}</div>
            </div>
            <span className="text-xs text-base-content/50">{conv.updatedAt && new Date(conv.updatedAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
