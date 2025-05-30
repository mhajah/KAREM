import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { UserProvider } from "./providers/UserProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <SidebarProvider>
          <RouterProvider router={router} />
          </SidebarProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
