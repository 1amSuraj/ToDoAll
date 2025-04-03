"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchTasks } from "@/libs/api";
import TaskList from "@/components/TaskList";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const { user, loading } = useAuth();
    const router = useRouter();

    

  useEffect(()=>{
    console.log(loading, user)
    if (!loading) {
      if (!user) {
        console.log(1)
        router.push('/auth/login')
      }
    }
  },[user, loading])

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <TaskList />
    </div>
  );
}