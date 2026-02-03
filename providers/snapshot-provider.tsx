"use client"
import { createContext, useContext, useState } from "react";

type SnapshotModeContextType = {
  snapshotMode: boolean;
  setSnapshotMode: (v: boolean) => void;
};

const SnapshotModeContext = createContext<SnapshotModeContextType | undefined>(
  undefined,
);

export function useSnapshotMode() {
  const ctx = useContext(SnapshotModeContext);
  if (!ctx)
    throw new Error("useSnapshotMode must be used within SnapshotModeProvider");
  return ctx;
}

export function SnapshotModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snapshotMode, setSnapshotMode] = useState(false);
  return (
    <SnapshotModeContext.Provider value={{ snapshotMode, setSnapshotMode }}>
      {children}
    </SnapshotModeContext.Provider>
  );
}
