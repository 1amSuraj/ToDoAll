import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BC_URL}/api/tasks`;

export const fetchTasks = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL, {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const addTask = async (title: string) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    API_URL,
    { title },
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const deleteTask = async (taskId: string) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `${token}` },
  });
};
