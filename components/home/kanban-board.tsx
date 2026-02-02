"use client";
import { useEffect, useState } from "react";

import type { BoardState } from "@/types/task";

import Board from "./board";

const empty_board: BoardState = {
  today: [],
  ongoing: [],
  completed: [],
  failed: [],
};

export default function KanbanBoard() {
  const [board, setBoard] = useState<BoardState>(empty_board);

  useEffect(() => {
    const boards = localStorage.getItem("kanban-board");
    if (boards) {
      setBoard(JSON.parse(boards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(board));
  }, [board]);

  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
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
    </div>
  );
}
