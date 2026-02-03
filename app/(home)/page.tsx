"use client";
import { useEffect } from "react";

import Container from "@/components/global/container";
import Header from "@/components/home/header";
import KanbanBoard from "@/components/home/kanban-board";
import Navbar from "@/components/navigations/navbar";
import { cn } from "@/lib/utils";
import { useSnapshotMode } from "@/providers/snapshot-provider";

export default function Home() {
  const { snapshotMode, setSnapshotMode } = useSnapshotMode();

  useEffect(() => {
    if (!snapshotMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSnapshotMode(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snapshotMode, setSnapshotMode]);

  return (
    <Container
      className={cn(
        snapshotMode ? "flex min-h-screen flex-col justify-center" : "",
      )}
    >
      {!snapshotMode && <Navbar />}
      <Header />
      <KanbanBoard />
    </Container>
  );
}
