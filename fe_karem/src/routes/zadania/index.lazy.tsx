import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { getTasks, Task } from "@/api/api-endpoints";
import { TaskPreview } from "@/components/tasks/TaskPreview";
import { Input } from "@/components/ui/input";
import ProtectedRoute from "@/components/ProtectedRoute";

export const Route = createLazyFileRoute("/zadania/")({
  component: () => <ProtectedRoute element={<Tasks />} minRoleValue={1} />,
});

function Tasks() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const parameterTag = new URLSearchParams(window.location.search).get("tag");
  const [searchQuery, setSearchQuery] = React.useState<string>(parameterTag ?? "");

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDescription = task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch || matchesTag || matchesDescription;
  });

  return (
    <>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">Zadania</h1>
      <Input
        type="text"
        placeholder="Wyszukaj zadania..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {filteredTasks.map((task, index) => (
          <TaskPreview key={index} task={task} />
        ))}
      </div>
    </>
  );
}
