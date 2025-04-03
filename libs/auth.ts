import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BC_URL}/api/auth`;

export const signup = async (name: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/signup`, { name, email, password });
  localStorage.setItem("token", res.data.token);
  return res.data.user;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: ` ${token}` },
    });
    return res.data;
  } catch (error) {
    logout();
    return null;
  }
};
