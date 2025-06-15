/**
 * Main application entry point for the KAREM frontend.
 * Sets up the React application with all necessary providers and configurations.
 * 
 * Providers:
 * - QueryClientProvider: Manages server state and caching
 * - ThemeProvider: Handles application theming
 * - UserProvider: Manages user authentication state
 * - SidebarProvider: Controls sidebar state
 * 
 * Configuration:
 * - React Router setup with route tree
 * - Query client configuration with 5-minute stale time
 * - Strict mode enabled for development
 * 
 * Note: The application uses TanStack Query for data fetching
 * and TanStack Router for routing management.
 */

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
