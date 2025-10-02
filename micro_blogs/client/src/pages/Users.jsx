import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:3000/api/users/all', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (id) => {
    await axios.post(`http://localhost:3000/api/users/${id}/follow`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setFollowed([...followed, id]);
  };

  const handleUnfollow = async (id) => {
    await axios.post(`http://localhost:3000/api/users/${id}/unfollow`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setFollowed(followed.filter(f => f !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">Discover People</h2>
      {loading ? <div className="text-center">Loading...</div> : (
        <ul className="flex flex-col gap-4">
          {users.map(u => (
            <li key={u._id} className="card card-side bg-white/95 border border-gray-100 shadow-sm flex flex-row items-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl">
              <div className="avatar placeholder mr-4">
                <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-xl font-bold">{u.username[0]}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-semibold text-lg text-gray-800 truncate">{u.username}</span>
              </div>
              <div className="ml-4 flex-shrink-0">
                {followed.includes(u._id) ? (
                  <button className="btn btn-outline btn-sm rounded-full px-5 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-colors" onClick={() => handleUnfollow(u._id)}>
                    Unfollow
                  </button>
                ) : (
                  <button className="btn bg-emerald-600 btn-sm rounded-full px-5 text-white border-none hover:bg-emerald-700 transition-colors" onClick={() => handleFollow(u._id)}>
                    Follow
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
