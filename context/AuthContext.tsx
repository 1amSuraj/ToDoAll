"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUser();
    };
    initializeUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BC_URL}/api/auth/me`, {
          headers: { Authorization: `${token}` },
        });
        setUser(res.data); // Set the user data after successful response
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout(); // Logout if the request fails
      }
    } else {
      setUser(null); // Ensure user is null if no token exists
    }
  
    setLoading(false); // Stop loading
  };

  const login = async (email: string, password: string) => {
  
    const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    console.log(res.data.user)
    setUser(res.data.user);

    setLoading(false);
    router.push("/dashboard");

  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);