"use client";
import { IconCamera } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          <AnimatedText className="font-inter text-2xl font-bold">
            Tasky
          </AnimatedText>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="https://github.com/harxhitbuilds/Tasky"
                target="_blank"
                className="inline-flex items-center"
              >
                <IconBrandGithub size={18} className="text-muted-foreground" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-background text-foreground flex items-center gap-1 border py-3">
              <Image
                src="/assets/dev.png"
                alt="harxhitbuilds"
                height={20}
                width={20}
                className="rounded-full"
              />
              <p>@harxhitbuilds</p>
            </TooltipContent>
          </Tooltip>

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

            <span className="font-inter">Snapshot</span>
          </Button>
        </div>
      </nav>
    </Container>
  );
}
