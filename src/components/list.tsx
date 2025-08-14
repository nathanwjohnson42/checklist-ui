"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Task = {
    id: number;
    title: string;
    color: string;
    completed?: boolean;
};

type ListProps = {
    tasks: Task[];
    onDelete?: (id: number) => void;
    onToggleComplete?: (id: number, completed: boolean) => void;
};

export default function List({ tasks, onDelete, onToggleComplete }: ListProps) {
      const router = useRouter();
    
    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center mt-12">
                <Image src="/clipboard.svg" alt="empty" width={100} height={100} />
                <p className="font-bold mt-4">You don't have any tasks registered yet.</p>
                <p className="text-gray-500">Create tasks and organize your to-do items.</p>
            </div>
        );
    }

    return (
        <ul className="mt-6 flex flex-col gap-3 max-w-[736px] mx-auto">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className={`flex items-center p-4 rounded-lg h-16 ${task.completed ? "bg-[#262626]" : "bg-[#333333]"
                        }`}
                >
                    <button
                        onClick={() => onToggleComplete && onToggleComplete(task.id, !task.completed)}
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                            border: task.completed ? "none" : `2px solid ${task.color}`,
                            backgroundColor: task.completed ? task.color : "transparent",
                        }}
                    >
                        {task.completed && (
                            <Image src="/check.svg" alt="completed" width={12} height={12} />
                        )}
                    </button>

                    <span
                        className={`flex-1 ml-4 text-white cursor-pointer ${task.completed ? "line-through" : ""
                            }`}
                        onClick={() => router.push(`/edit-task/${task.id}`)}
                    >
                        {task.title}
                    </span>

                    <button
                        onClick={() => onDelete && onDelete(task.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-full"
                    >
                        <Image src="/trash.svg" alt="delete" width={20} height={20} />
                    </button>
                </li>
            ))}
        </ul>
    );
}
