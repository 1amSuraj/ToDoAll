"use client";
import { useEffect, useState } from "react";
import { fetchTasks } from "../libs/api";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";

export default function TaskList() {
  console.log(22);
  const [tasks, setTasks] = useState<any[]>([]);
  const [eg, seteg] = useState("hi0");

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <p
        onClick={() => {
          seteg("sdfsdf");
        }}
      >
        {eg}
      </p>
      <TaskForm onTaskAdded={loadTasks} />
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} onTaskDeleted={loadTasks} />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}
