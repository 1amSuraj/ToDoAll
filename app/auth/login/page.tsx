"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const { user, loading, login } = useAuth();
  const [password, setPassword] = useState("");
  const router = useRouter();


useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    } 
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input className="border p-2 mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Login</button>
      </form>
    </div>
  );
}
