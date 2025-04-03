"use client";
import { deleteTask } from "../libs/api";

export default function TaskItem({ task, onTaskDeleted }: { task: any; onTaskDeleted: () => void }) {
  const handleDelete = async () => {
    await deleteTask(task._id);
    onTaskDeleted(); // Refresh task list after deletion
  };

  return (
    <div className="flex justify-between items-center border p-2 mb-2 rounded bg-white shadow">
      <span>{task.title}</span>
      <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white rounded">
        Delete
      </button>
    </div>
  );
}
