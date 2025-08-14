"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import List from "@/components/list";
import Header from "@/components/header";
import Button from "@/components/button";

type Task = {
  id: number;
  title: string;
  color: string;
};

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:4000/task/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const res = await fetch(`http://localhost:4000/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="grid items-center justify-items-center grid-rows-[0_1fr_20px]">
        <Button
          className="w-[736px] h-[52px] flex items-center justify-center gap-2"
          variant="primary"
          onClick={() => router.push("/new-task")}
        >
          Create New Task{" "}
          <Image
            src="/circle-plus.svg"
            alt="plus"
            width={15.97}
            height={15.97}
            priority
          />
        </Button>
      </div>
      {loading ? (
        <p className="text-center mt-6">Loading tasks...</p>
      ) : (
        <List
          tasks={tasks}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />)}
    </div>
  );
}
