import CodeRunner from "@/components/code-runner/CodeRunner";
import { useAuth } from "@/hooks/use-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/code-runner")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  if (auth.loading) {
    return null;
  }
  return <CodeRunner />;
}
