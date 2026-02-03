import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import type { BoardState, ColumnType, Task } from "@/types/task";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(40, "Max length is 20"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(150, "Max length is 40"),
});

type Inputs = {
  title: string;
  description: string;
};

export function TaskAddDialog({
  setBoard,
  column,
}: {
  setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
  column: ColumnType;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const today = new Date();
    const time = today.toLocaleTimeString();

    setBoard((prev) => ({
      ...prev,
      [column]: [
        {
          id: uuidv4(),
          title: data.title,
          description: data.description,
          createdAt: time,
        },
        ...prev[column],
      ],
    }));
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconPlus size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add your task here. Procrastination ends… for now.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Task</Label>
              <Input id="name-1" {...register("title")} />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
