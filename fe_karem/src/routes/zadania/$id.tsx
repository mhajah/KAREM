import { getTaskById, Task } from "@/api/api-endpoints";
import CodeRunner from "@/components/code-runner/CodeRunner";
import { TaskTag } from "@/components/tasks/TaskTag";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Clock, Database, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/zadania/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/zadania/$id" });
  const [task, setTask] = useState<Task | null>(null);

  const fetchTask = async (taskId: string) => {
    try {
      const fetchedTask = await getTaskById(taskId);
      setTask(fetchedTask);
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTask(id);
    }
  }, [id]);

  return (
    <>
      <div className="mb-5 flex space-x-4">
        {task?.tags.map((tag) => (
          <Link to={`/zadania?tag=${tag}`} key={tag}>
            <TaskTag key={tag} tag={tag} />
          </Link>
        ))}
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{task?.name}</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{task?.description}</p>
      <div className="mt-10 flex space-x-4">
        <span className="flex items-center mt-2">
          <Clock className="inline-block w-6 h-6 mr-2" />
          <p className="leading-7">{task?.maxTime}ms</p>
        </span>
        <span className="flex items-center mt-2">
          <Database className="inline-block w-6 h-6 mr-2" />
          <p className="leading-7">{task?.maxMemory}MB</p>
        </span>
        <span className="flex items-center mt-2">
          <RotateCcw className="inline-block w-6 h-6 mr-2" />
          <p className="leading-7">{task?.maxAttempts}</p>
        </span>
      </div>
      {task?._id && <CodeRunner taskID={task._id} />}
    </>
  );
}
