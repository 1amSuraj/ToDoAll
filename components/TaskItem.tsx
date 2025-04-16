"use client";
import { useState } from "react";
import { deleteTask, updateTask } from "../libs/api";

export default function TaskItem({
  task,
  onTaskDeleted,
}: {
  task: any;
  onTaskDeleted: () => void;
}) {
  const [edit, setEdit] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");

  const handleDelete = async () => {
    await deleteTask(task._id);
    onTaskDeleted(); // Refresh task list after deletion
  };
  const handleUpdate = async () => {
    await updateTask(task._id, updatedValue);
    setEdit(false);
    onTaskDeleted(); // Refresh task list after deletion
  };

  return (
    <div className="flex justify-between items-center border p-2 mb-2 rounded bg-white shadow text-black">
      {edit ? (
        <>
          <input
            type="text"
            placeholder={task.title}
            onChange={(e) => {
              setUpdatedValue(e.target.value);
            }}
          />{" "}
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <span>{task.title}</span>
      )}

      <button
        onClick={() => {
          setEdit(!edit);
        }}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
}
