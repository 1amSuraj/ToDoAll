"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // Auto-login after signup

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BC_URL}/api/auth/signup`, { name, email, password });
      localStorage.setItem("token", res.data.token);
      login(email, password); // Auto-login after successful signup
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col">
        <input className="border p-2 mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2 mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Signup</button>
      </form>
    </div>
  );
}
