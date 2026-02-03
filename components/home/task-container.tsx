import { useDraggable } from "@dnd-kit/core";
import { IconClock } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import { Trash } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import type { ColumnType, Task } from "@/types/task";

import { Badge } from "../ui/badge";

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
      className="w-full cursor-grab space-y-4 rounded-sm border border-zinc-200 bg-zinc-200/20 py-3 pt-3 dark:border-zinc-800 dark:bg-zinc-900/60"
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
      <div className="flex items-center justify-between px-3">
        <p className="text-muted-foreground flex items-center gap-1 text-[10px]">
          <IconClock size={10} />
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </p>
        <Badge
          className={cn(
            "rounded-xs py-0",
            task.priority === "low" && "bg-green-500/10 text-green-400",
            task.priority === "medium" && "bg-yellow-500/10 text-yellow-400",
            task.priority === "high" && "bg-red-500/10 text-red-400",
          )}
        >
          {task.priority}
        </Badge>
      </div>
      {/* <div className="flex items-center justify-between px-3 text-right text-[10px] text-zinc-400">
        <Trash
          onClick={() => onRemove?.(task.id)}
          size={16}
          className="cursor-pointer text-red-700/60"
        />
      </div> */}
    </motion.div>
  );
}
