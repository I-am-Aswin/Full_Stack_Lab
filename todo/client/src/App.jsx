import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, saveToken, logout };
}

function Login({ saveToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      saveToken(res.data.token);
      navigate("/tasks");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="card w-96 bg-white shadow-xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="mt-4 text-sm text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </motion.div>
    </div>
  );
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="card w-96 bg-white shadow-xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
        <p className="mt-4 text-sm text-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </motion.div>
    </div>
  );
}

function Tasks({ token, logout }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task", { headers: { Authorization: `Bearer ${token}` } });
      setTasks(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await api.post("/task", { title: newTask }, { headers: { Authorization: `Bearer ${token}` } });
      setNewTask("");
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await api.patch(`/task/${id}/complete`, { completed: !completed }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/task/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="card max-w-xl mx-auto bg-white shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">My Tasks</h2>
          <button onClick={logout} className="btn btn-outline btn-error btn-sm">Logout</button>
        </div>
        <div className="flex gap-2 mb-6">
          <input type="text" placeholder="Add a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} className="input input-bordered flex-1" />
          <button onClick={addTask} className="btn btn-primary">Add</button>
        </div>
        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task._id} className="flex justify-between items-center bg-blue-100 rounded-xl px-4 py-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task._id, task.completed)} className="checkbox checkbox-primary" />
                <span className={task.completed ? "line-through text-gray-500" : "text-gray-800"}>{task.title}</span>
              </div>
              <button onClick={() => deleteTask(task._id)} className="btn btn-outline btn-error btn-sm">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const { token, saveToken, logout } = useAuth();

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login saveToken={saveToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/tasks" element={<Tasks token={token} logout={logout} />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;