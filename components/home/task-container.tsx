import { useDraggable } from "@dnd-kit/core";
import { Trash } from "lucide-react";
import { motion } from "motion/react";

import type { ColumnType, Task } from "@/types/task";

export default function TaskBox({
  task,
  column,
  onRemove,
}: {
  task: Task;
  column: ColumnType | null;
  onRemove?: (taskId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { fromColumn: column },
  });
  return (
    <motion.div
      key={task.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full cursor-grab space-y-4 rounded-sm border border-zinc-200 bg-zinc-200/60 py-3 pt-3 dark:border-zinc-800 dark:bg-zinc-900/60"
      draggable
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.setData("fromColumn", column);
      }}
    >
      <div className="space-y-2 px-3">
        <h2 className="text-sm">{task.title}</h2>
        <p className="text-muted-foreground text-xs">{task.description}</p>
      </div>
      <div className="flex items-center justify-between px-3 text-right text-[10px] text-zinc-400">
        <p> {task.createdAt}</p>
        <Trash
          onClick={() => onRemove?.(task.id)}
          size={14}
          className="cursor-pointer text-red-700/60"
        />
      </div>
    </motion.div>
  );
}
