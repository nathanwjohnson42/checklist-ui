"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/button";

const COLORS = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#A2845E",
];

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:4000/task/${id}`);
        const task = await res.json();


        setTitle(task.title);
        setSelectedColor(task.color);
      } catch (err) {
        console.error(err);
        alert("Failed to load task");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdateTask = async () => {
    if (!title || !selectedColor) return alert("Please fill in title and select a color");

    try {
      const res = await fetch(`http://localhost:4000/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color: selectedColor }),
      });
      if (!res.ok) throw new Error("Failed to update task");

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-[736px] flex items-center mb-6">
        <button onClick={() => router.push("/")} className="mr-4">
          <Image src="/back-arrow.svg" alt="back" width={24} height={24} />
        </button>
        <h1 className="text-2xl font-bold">Edit Task</h1>
      </div>

      <div className="w-full max-w-[736px] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-gray-700">Color</span>
          <div className="flex gap-3 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-10 h-10 rounded-full border-2 transition ${selectedColor === color
                  ? "border-white scale-110"
                  : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        <Button
            className="w-[736px] mt-6 flex items-center justify-center gap-2 font-bold"
          variant="primary"
          onClick={handleUpdateTask}
        >
          Save <Image
            src="/check.svg"
            alt="check"
            width={15.97}
            height={15.97}
            priority
          />
        </Button>
      </div>
    </div>
  );
}
