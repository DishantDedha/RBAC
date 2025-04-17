// pages/login.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      login(res.data.token, res.data.user);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-gray-800">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 shadow-md rounded-md w-80 bg-white text-gray-800">
        <h2 className="text-xl font-semibold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded text-gray-800"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded text-gray-800"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
