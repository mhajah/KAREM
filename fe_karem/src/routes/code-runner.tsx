import CodeRunner from "@/components/code-runner/CodeRunner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/code-runner")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CodeRunner />;
}
