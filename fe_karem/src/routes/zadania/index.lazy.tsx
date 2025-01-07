import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/zadania/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">Zadania</h1>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Zarejestrowani</h3>
    </>
  );
}
