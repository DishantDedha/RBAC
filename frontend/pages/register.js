import { useState } from "react";
import { Router, useRouter } from "next/router";
import axios from "axios";

export default function Register()
{
    const router=useRouter();
    const [form,setForm]=useState({
        username: "",
    email: "",
    password: "",
    isAdmin: false,
    });

    const handlesubmit=async(e)=>{
        e.preventDefault();

        try{
            await axios.post("http://localhost:5000/api/register",form);
            alert("Registration Successfull");
            router.push("/login");

        }catch(err)
        {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handlesubmit} className="space-y-4 p-6 shadow-md rounded-md w-80 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">Register</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded text-gray-800"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
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
            <label className="flex items-center text-gray-800">
              <input
                type="checkbox"
                className="mr-2"
                checked={form.isAdmin}
                onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
              />
              Register as Admin
            </label>
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded text-gray-800">
              Register
            </button>
          </form>
        </div>
      );
}