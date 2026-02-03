export type ColumnType = "today" | "ongoing" | "completed" | "failed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: string;
  createdAt: string;
};

export type BoardState = {
  today: Task[];
  ongoing: Task[];
  completed: Task[];
  failed: Task[];
};
