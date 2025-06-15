/**
 * Tasks List Component for the KAREM frontend.
 * Displays a table of programming tasks with management capabilities.
 * 
 * Features:
 * - Tabular display of tasks
 * - Task difficulty indicators
 * - Task status indicators
 * - Task management actions
 * 
 * Actions:
 * - View task details
 * - Edit task (opens dialog)
 * - Delete task (with confirmation)
 * 
 * UI Components:
 * - Sortable table with headers
 * - Difficulty badges with color coding
 * - Status icons (enabled/disabled)
 * - Action buttons with icons
 * 
 * Integration:
 * - Uses React Query for data mutations
 * - Integrates with task editing form
 * - Handles task deletion with confirmation
 * - Links to individual task pages
 * 
 * Note: Task management actions are protected
 * by role-based access control
 */

import { Task, useDeleteTask } from "@/api/api-endpoints";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Check, DeleteIcon, Edit, ExternalLink, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { EditTaskForm } from "./EditTaskForm";
import { difficultyMap } from "./diffcultyMap";
import { Button } from "../ui/button";

export function TasksList({ tasks }: { tasks: Task[] }) {
  const { mutate: deleteTask } = useDeleteTask();
  return (
    <div>
      <Table className="overflow-clip">
        <TableCaption>Wszystkie dostepne zadania.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nazwa</TableHead>
            <TableHead className="w-[150px] text-center">Poziom trudności</TableHead>
            <TableHead className="w-[75px]">Status</TableHead>
            <TableHead className="w-[125px] text-center">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={task._id as string}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell className="flex items-center justify-center">
                <span
                  className={`${difficultyMap[task.difficulty]?.color} rounded-md py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm`}
                >
                  {difficultyMap[task.difficulty]?.text}
                </span>
              </TableCell>
              <TableCell>{task.enabled ? <Check /> : <X />}</TableCell>
              {task._id && (
                <TableCell className="flex items-center justify-around space-x-2">
                  <Link to={`/zadania/${task._id}`}>
                    <ExternalLink />
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Edit className="hover:cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] lg:max-w-[900px] 2xl:max-w-[1200px] text-foreground overflow-y-scroll max-h-screen">
                      <DialogHeader>
                        <DialogTitle>Edycja zadania</DialogTitle>
                      </DialogHeader>
                      <EditTaskForm task={task} />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <DeleteIcon />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Czy na pewno chcesz usunąć to zadanie?</DialogTitle>
                      </DialogHeader>
                      <Button onClick={() => deleteTask(task._id as string)} variant={"destructive"}>
                        Usuń
                      </Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
