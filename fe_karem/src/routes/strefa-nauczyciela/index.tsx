import { useTasks } from "@/api/api-endpoints";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AddTaskDialog } from "@/components/tasks/AddTask";
import { TasksList } from "@/components/tasks/TasksList";
import { Header } from "@/components/typography/Typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/strefa-nauczyciela/")({
  component: () => <ProtectedRoute element={<RouteComponent />} minRoleValue={2} />,
});

function RouteComponent() {
  const { data: tasks = [] } = useTasks();

  return (
    <>
      <Header variant="h2">Strefa Nauczyciela</Header>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        W strefie nauczyciela możesz edytować i dodawać zadania, a także śledzić postępy uczniów!
      </p>
      <Header variant="h3" className="my-4">Zadania</Header>
      <div className="mb-5">
        <AddTaskDialog tasks={tasks} />
      </div>
      <TasksList tasks={tasks} />
    </>
  );
}
