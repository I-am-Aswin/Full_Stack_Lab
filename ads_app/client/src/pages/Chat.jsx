import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('/', { autoConnect: false });

export default function Chat({ user }) {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product');
  const to = searchParams.get('to');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    socket.auth = { token: localStorage.getItem('token') };
    socket.connect();
    socket.on('message', msg => setMessages(msgs => [...msgs, msg]));
    return () => { socket.disconnect(); };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit('message', { to, product, content: input });
    setMessages(msgs => [...msgs, { sender: user.name, content: input, self: true }]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-lg p-4 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <div key={i} className={`chat ${msg.self ? 'chat-end' : 'chat-start'}`}>
              <div className={`chat-bubble ${msg.self ? 'bg-[var(--accent)] text-white' : 'bg-base-200'}`}>{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input className="input input-bordered flex-1" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." />
          <button className="btn btn-accent bg-[var(--accent)] border-none text-white" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
