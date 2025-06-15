/**
 * Task Preview Component for the KAREM frontend.
 * Displays a condensed view of a programming task in a card format.
 * 
 * Features:
 * - Task name and description preview
 * - Tag display
 * - Truncated description (200 characters)
 * - Navigation link to full task
 * 
 * UI Components:
 * - Card layout with header, content, and footer
 * - Tag list display
 * - Navigation button
 * 
 * Styling:
 * - Responsive text sizing
 * - Shadow and border effects
 * - Flexible layout with flex-grow
 * 
 * Note: Used in task lists and search results
 * to provide a quick overview of task content
 */

import { Task } from "@/api/api-endpoints";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function TaskPreview({ task }: { task: Task }) {
  return (
    <Card className="shadow-md rounded-lg p-4 flex flex-col bg-sidebar border-sidebar-border">
      <CardHeader>
        <CardTitle className="lg:text-xl">{task.name}</CardTitle>
        <CardDescription className="flex-grow">
          {task.tags.map((tag) => (
            <span key={tag} className="mr-2">
              {tag}
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{task.description.length > 200 ? `${task.description.substring(0, 200)}...` : task.description}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/zadania/${task._id}`}>
          <Button>Przejdź</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
