import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "@/api/api-endpoints";

export function AddTaskDialog({ tasks, fetchTasks }: { tasks: Task[]; fetchTasks: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Dodaj nowe zadanie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] lg:max-w-[900px] 2xl:max-w-[1200px] text-foreground overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Dodawanie zadania</DialogTitle>
        </DialogHeader>
        <AddTaskForm tasks={tasks} fetchTasks={fetchTasks} />
      </DialogContent>
    </Dialog>
  );
}
