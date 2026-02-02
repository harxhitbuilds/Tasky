import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import type { BoardState, ColumnType, Task } from "@/types/task";

import { Separator } from "../ui/separator";
import { TaskAddDialog } from "./add-task-dialog";
import TaskBox from "./task-container";

export default function Board({
  title,
  column,
  tasks,
  setBoard,
  accent,
}: {
  title: string;
  column: ColumnType;
  tasks: Task[];
  setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
  accent: string;
}) {
  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("text/plain");
    const fromColumn = e.dataTransfer.getData("fromColumn") as ColumnType;
    if (!taskId || fromColumn === column) return;

    setBoard((prev) => {
      const task = prev[fromColumn].find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        [fromColumn]: prev[fromColumn].filter((t) => t.id !== taskId),
        [column]: [task, ...prev[column]],
      };
    });
  };

  const handleRemoveTask = (taskId: string) => {
    setBoard((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t.id !== taskId),
    }));
  };
  return (
    <div
      className="w-full max-w-[60vh] rounded-sm border dark:border-zinc-900"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="mt-4 flex items-center justify-between px-4">
        <p
          className={cn(
            "rounded px-2 py-1 text-xs font-semibold",
            accent === "today" && "bg-today/10 text-today",
            accent === "ongoing" && "bg-ongoing/10 text-ongoing",
            accent === "completed" && "bg-completed/10 text-completed",
            accent === "failed" && "bg-failed/10 text-failed",
          )}
        >
          {title}
        </p>
        {column === "today" && (
          <TaskAddDialog setBoard={setBoard} column={column} />
        )}
      </div>

      <div className="mt-4 px-4">
        <Separator />
      </div>

      <div className="scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent dark:scrollbar-thumb-zinc-700 mt-6 flex h-[48vh] min-h-[50vh] flex-col gap-4 overflow-y-auto px-4 py-2">
        {tasks.map((task) => (
          <TaskBox
            key={task.id}
            task={task}
            column={column}
            onRemove={handleRemoveTask}
          />
        ))}
      </div>
    </div>
  );
}
