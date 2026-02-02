import { IconPlus } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";

import { useRef } from "react";
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
  } = useForm<Inputs>();

  const closeRef = useRef<HTMLButtonElement>(null);

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
    closeRef.current?.click();
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
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button ref={closeRef} variant="outline" type="button">
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
