"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";

import type { ColumnType, Task } from "@/types/task";
import type { BoardState } from "@/types/task";

import BoardSkeleton from "../skeletons/board";
import Board from "./board";
import TaskBox from "./task-container";

const empty_board: BoardState = {
  today: [],
  ongoing: [],
  completed: [],
  failed: [],
};

export default function KanbanBoard() {
  const [board, setBoard] = useState<BoardState>(empty_board);
  const [loading, setloading] = useState(true);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setactiveColumn] = useState<ColumnType | null>(null);

  useEffect(() => {
    const savedDate = localStorage.getItem("kanban-board-date");
    const today = new Date().toISOString().slice(0, 10);

    if (savedDate !== today) {
      setBoard({
        today: [],
        ongoing: [],
        completed: [],
        failed: [],
      });
      localStorage.setItem("kanban-board-date", today);
      localStorage.setItem(
        "kanban-board",
        JSON.stringify({
          today: [],
          ongoing: [],
          completed: [],
          failed: [],
        }),
      );
    } else {
      const boards = localStorage.getItem("kanban-board");
      if (boards) {
        setBoard(JSON.parse(boards));
      }
    }

    const timeout = setTimeout(() => setloading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("kanban-board", JSON.stringify(board));
    localStorage.setItem("kanban-board-date", today);
  }, [board]);

  if (loading) {
    return (
      <div className="mt-6 flex flex-row gap-4 overflow-x-auto md:grid md:grid-cols-4 md:overflow-x-visible">
        {[...Array(4)].map((_, i) => (
          <BoardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const allTasks = [
      ...board.today,
      ...board.ongoing,
      ...board.completed,
      ...board.failed,
    ];
    const task = allTasks.find((t) => t.id === active.id);
    setActiveTask(task || null);

    const fromColumn = event.active.data.current?.fromColumn as
      | ColumnType
      | undefined;
    setactiveColumn(fromColumn ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setactiveColumn(null);

    const { active, over } = event;
    if (!over) return;

    const fromColumn = event.active.data.current?.fromColumn as ColumnType;
    const toColumn = over.id as ColumnType;

    if (!fromColumn || !toColumn || fromColumn === toColumn) return;

    setBoard((prev) => {
      const task = prev[fromColumn].find((t) => t.id === active.id);
      if (!task) return prev;
      return {
        ...prev,
        [fromColumn]: prev[fromColumn].filter((t) => t.id !== active.id),
        [toColumn]: [task, ...prev[toColumn]],
      };
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex flex-row gap-4 overflow-x-auto px-4 md:grid md:grid-cols-4 md:overflow-x-visible"
          >
            {[...Array(4)].map((_, i) => (
              <BoardSkeleton key={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-6 flex flex-row gap-4 overflow-x-auto px-4 md:grid md:grid-cols-4 md:overflow-x-visible lg:px-0"
          >
            <Board
              title="Today Tasks"
              column="today"
              tasks={board.today}
              setBoard={setBoard}
              accent="today"
            />
            <Board
              title="Ongoing"
              column="ongoing"
              tasks={board.ongoing}
              setBoard={setBoard}
              accent="ongoing"
            />
            <Board
              title="Completed"
              column="completed"
              tasks={board.completed}
              setBoard={setBoard}
              accent="completed"
            />
            <Board
              title="Failed"
              column="failed"
              tasks={board.failed}
              setBoard={setBoard}
              accent="failed"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <DragOverlay>
        {activeTask ? (
          <TaskBox task={activeTask} column={activeColumn} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
