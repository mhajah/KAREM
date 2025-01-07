import { getTasks, Task } from "@/api/api-endpoints";
import { AddTaskDialog } from "@/components/tasks/AddTask";
import { TasksList } from "@/components/tasks/TasksList";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/strefa-nauczyciela/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">Strefa Nauczyciela</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        W strefie nauczyciela możesz edytować i dodawać zadania, a także śledzić postępy uczniów!
      </p>
      <h2 className="mt-10 mb-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">Zadania</h2>
      <div className="mb-5">
        <AddTaskDialog tasks={tasks} fetchTasks={fetchTasks} />
      </div>
      <TasksList tasks={tasks} fetchTasks={fetchTasks} />
    </>
  );
}
