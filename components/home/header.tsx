import { homepageConfig } from "@/config/home";

import { Badge } from "../ui/badge";

export default function Header() {
  const date = new Date();
  const todayParts = date
    .toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .split(", ");
  const weekday = todayParts[0];
  const rest = todayParts.slice(1).join(", ");

  return (
    <div className="flex flex-col gap-3">
      <Badge className="bg-accent/10 text-accent rounded-xs border border-zinc-200 dark:border-zinc-800">
        {homepageConfig.tagLine}
      </Badge>
      <h1 className="text-4xl font-semibold">
        <span className="text-accent">{weekday}</span>
        {`, ${rest}`}
      </h1>
      <p className="text-muted-foreground max-w-xl">
        {homepageConfig.motivationLine}
      </p>
    </div>
  );
}
