export default function BoardSkeleton() {
  return (
    <div className="min-h-[60vh] w-full max-w-[60vh] min-w-75 animate-pulse rounded-sm border bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mt-4 flex items-center justify-between px-4">
        <div className="h-6 w-32 rounded bg-zinc-300 dark:bg-zinc-800" />
        <div className="h-8 w-8 rounded bg-zinc-300 dark:bg-zinc-800" />
      </div>
      <div className="mt-4 px-4">
        <div className="h-px w-full bg-zinc-300 dark:bg-zinc-800" />
      </div>
      <div className="mt-6 flex flex-col gap-4 px-4 py-2">
        {[...Array(3)].map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function TaskSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-sm border border-zinc-200 bg-zinc-200/60 pt-3 pl-3 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-2 h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-800" />
      <div className="mb-2 h-3 w-40 rounded bg-zinc-200 dark:bg-zinc-900" />
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-900" />
        <div className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
