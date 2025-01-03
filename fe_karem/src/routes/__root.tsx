import * as React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header/Header";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@/providers/UserProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { loading } = useUser();
  if (loading) {
    return null;
  }
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Toaster />
        <main className="text-foreground p-4 ml-2">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}
