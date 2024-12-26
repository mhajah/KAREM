import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import UsersView from "@/components/users/UsersView";

export const Route = createLazyFileRoute("/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersView />;
}
