import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "@/api/api-endpoints";
import { useState } from "react";

export function AddTaskDialog({ tasks }: { tasks: Task[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Dodaj nowe zadanie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] lg:max-w-[900px] 2xl:max-w-[1200px] text-foreground overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Dodawanie zadania</DialogTitle>
        </DialogHeader>
        <AddTaskForm tasks={tasks} setIsDialogOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
