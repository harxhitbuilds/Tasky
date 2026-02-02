import { IconCamera } from "@tabler/icons-react";

import Container from "../global/container";
import ModeToggle from "../theme/mode-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <Container>
      <nav className="flex h-24 w-full items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasky</h1>
        </div>
        <div>
          <ModeToggle />
          <Button variant="outline">
            <IconCamera />
            <span>Take a Snapshot</span>
          </Button>
        </div>
      </nav>
    </Container>
  );
}
