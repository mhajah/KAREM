import { Task } from "@/api/api-endpoints";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function TaskPreview({ task }: { task: Task }) {
  return (
    <Card className="shadow-md rounded-lg p-4 flex flex-col">
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
