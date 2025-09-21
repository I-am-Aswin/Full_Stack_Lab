import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed " + err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
}
