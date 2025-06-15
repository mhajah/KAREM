/**
 * Add Task Dialog Component for the KAREM frontend.
 * Provides a modal dialog for adding new programming tasks.
 * 
 * Features:
 * - Modal dialog with responsive sizing
 * - State management for dialog visibility
 * - Integration with AddTaskForm
 * - Scrollable content area
 * 
 * UI Components:
 * - Trigger button
 * - Dialog header with title
 * - Dialog content with form
 * - Responsive width breakpoints
 * 
 * Integration:
 * - Manages dialog state
 * - Passes task list to form
 * - Handles dialog open/close
 * 
 * Note: Dialog dimensions adjust based on screen size
 * and includes scrollable content for overflow
 */

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "@/api/api-endpoints";
import { useState } from "react";

export function AddTaskDialog({ tasks }: { tasks: Task[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Dodaj nowe zadanie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] lg:max-w-[900px] 2xl:max-w-[1200px] text-foreground overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Dodawanie zadania</DialogTitle>
        </DialogHeader>
        <AddTaskForm tasks={tasks} setIsDialogOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
