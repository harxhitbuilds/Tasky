"use client";
import { IconCamera } from "@tabler/icons-react";
import { motion } from "motion/react";
import { toast } from "sonner";

import { useSnapshotMode } from "@/providers/snapshot-provider";

import AnimatedText from "../global/animated-text";
import Container from "../global/container";
import ModeToggle from "../theme/mode-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  const { setSnapshotMode } = useSnapshotMode();

  return (
    <Container>
      <nav className="flex h-24 w-full items-center justify-between px-4 lg:px-0">
        <div>
          <AnimatedText className="text-2xl font-bold">Tasky</AnimatedText>
        </div>
        <div>
          <ModeToggle />
          <Button
            variant="outline"
            onClick={() => {
              setSnapshotMode(true);
              toast("Press Esc to exit snapshot mode");
            }}
            className="group cursor-pointer"
          >
            <IconCamera className="transition-all duration-100 ease-in-out group-hover:scale-110 group-hover:rotate-12" />

            <span>Snapshot</span>
          </Button>
        </div>
      </nav>
    </Container>
  );
}
