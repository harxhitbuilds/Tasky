import { useDroppable } from "@dnd-kit/core";
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
  const { setNodeRef } = useDroppable({ id: column });

  const handleRemoveTask = (taskId: string) => {
    setBoard((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t.id !== taskId),
    }));
  };
  return (
    <div
      className={cn(
        "relative z-10 w-full max-w-[60vh] min-w-75 rounded-sm border bg-white transition-colors duration-200 ease-in-out dark:border-zinc-900 dark:bg-zinc-950",
        accent === "today" &&
          "hover:border-today/40 dark:hover:border-today/20",
        accent === "ongoing" &&
          "hover:border-ongoing/40 dark:hover:border-ongoing/20",
        accent === "completed" &&
          "hover:border-completed/40 dark:hover:border-completed/20",
        accent === "failed" &&
          "hover:border-failed/40 dark:hover:border-failed/20",
      )}
      ref={setNodeRef}
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
          {title} <span></span>
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
