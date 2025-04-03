"use client";
import { useEffect, useState } from "react";
import { fetchTasks } from "../libs/api";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <TaskForm onTaskAdded={loadTasks} />
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task._id} task={task} onTaskDeleted={loadTasks} />)
      ) : (
        <p className="text-center text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}
