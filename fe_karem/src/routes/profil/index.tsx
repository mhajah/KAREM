import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@/providers/UserProvider';
import { Caption, Header } from '@/components/typography/Typography';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Table, TableCaption, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/ui/table';
import { CompletedTask, Task, useTasks } from '@/api/api-endpoints';
import { difficultyMap } from '@/components/tasks/diffcultyMap';
export const Route = createFileRoute('/profil/')({
  component: () => <ProtectedRoute element={<Profil />} minRoleValue={1} />,
})

const countTaskDifficulty = (tasks: Task[], difficulty: string, completedTasks: CompletedTask[]) => {
  return tasks?.filter((task) => task.difficulty === difficulty)?.filter((task) => completedTasks?.some((completedTask) => completedTask.taskId === task._id && completedTask.status === 'success'))?.length;
}

function Profil() {
  const { user } = useUser();
  const { data: tasks } = useTasks();
  const successTasks = user?.completedTasks?.filter((task) => task.status === 'success');
  const attemptsSum = user?.completedTasks?.reduce((acc, task) => acc + task.attempts, 0);

  const easyTasks = countTaskDifficulty(tasks || [], 'easy', user?.completedTasks || []);
  const mediumTasks = countTaskDifficulty(tasks || [], 'medium', user?.completedTasks || []);
  const hardTasks = countTaskDifficulty(tasks || [], 'hard', user?.completedTasks || []);
  
  return (
    <div>
      <Header variant="h2">{user?.name.toUpperCase()}</Header>
      <Caption className="mb-4">{user?.email} | {user?.role}</Caption>
      <div className="flex flex-col gap-2 bg-sidebar p-4 rounded-md border border-sidebar-border mt-2">
        <Header variant="h3">Zadania</Header>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex flex-row gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-md">Wykonane zadania</p>
              <p className="text-6xl font-bold">{successTasks?.length}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md">Całkowita liczba prób</p>
              <p className="text-6xl font-bold">{attemptsSum}</p>
            </div>
            <div className="w-[1px] bg-gray-200 h-full" />
            <div className="flex flex-col gap-2">
              <p className="text-md">Łatwe</p>
              <p className="text-6xl font-bold text-green-500">{easyTasks}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md">Średnie</p>
              <p className="text-6xl font-bold text-yellow-500">{mediumTasks}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md">Trudne</p>
              <p className="text-6xl font-bold text-red-500">{hardTasks}</p>
            </div>
          </div>
          <Table className="overflow-clip">
            <TableCaption>Lista wykonanych zadań.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Nazwa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">Poziom trudności</TableHead>
                <TableHead className="w-[250px]">Ostatnia próba</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.completedTasks?.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()).map((task, index) => (
                <TableRow key={task.taskId?.toString()}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{tasks?.find((t) => t._id === task.taskId)?.name}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <span
                      className={`${difficultyMap[tasks?.find((t) => t._id === task.taskId)?.difficulty as keyof typeof difficultyMap]?.color} rounded-md py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm`}
                    >
                      {difficultyMap[tasks?.find((t) => t._id === task.taskId)?.difficulty as keyof typeof difficultyMap]?.text}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(task?.completedAt).toLocaleDateString() + 
                  " " + new Date(task?.completedAt).toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
      </div>

    </div>
  )
}
