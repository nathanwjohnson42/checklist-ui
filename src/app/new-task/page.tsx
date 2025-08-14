"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Header from "@/components/header";

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

export default function NewTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!title || !selectedColor) return alert("Please fill in title and select a color");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color: selectedColor }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen p-6 flex flex-col items-center">
        <div className="w-full max-w-[736px] flex items-center mb-6">
          <button onClick={() => router.back()} className="mr-4">
            <Image src="/back-arrow.svg" alt="back" width={24} height={24} />
          </button>
        </div>

        <div className="w-full max-w-[736px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold text-skyBlue">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter task title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-skyBlue">Color</span>
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
            className="w-[736px] mt-6 flex items-center justify-center gap-2"
            variant="primary"
            onClick={handleCreateTask}
          >
            Add Task <Image
                        src="/circle-plus.svg"
                        alt="plus"
                        width={15.97}
                        height={15.97}
                        priority
                      />
          </Button>
        </div>
      </div>
    </div>

  );
}
