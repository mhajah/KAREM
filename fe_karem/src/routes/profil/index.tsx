import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@/providers/UserProvider';
import { Caption, Header } from '@/components/typography/Typography';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Table, TableCaption, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/ui/table';
export const Route = createFileRoute('/profil/')({
  component: () => <ProtectedRoute element={<Profil />} minRoleValue={1} />,
})

function Profil() {
  const { user } = useUser();

  const attemptsSum = user?.completedTasks?.reduce((acc, task) => acc + task.attempts, 0);
  // const easyTasks = user?.completedTasks?.filter((task) => task.difficulty === 'easy');
  // const mediumTasks = user?.completedTasks?.filter((task) => task.difficulty === 'medium');
  // const hardTasks = user?.completedTasks?.filter((task) => task.difficulty === 'hard');
  
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
              <p className="text-6xl font-bold">{user?.completedTasks?.length}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md">Całkowita liczba prób</p>
              <p className="text-6xl font-bold">{attemptsSum}</p>
            </div>
            <div className="w-[1px] bg-gray-200 h-full" />
            <div className="flex flex-col gap-2">
              <p className="text-md">Łatwe</p>
              <p className="text-6xl font-bold text-green-500">13</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md">Średnie</p>
              <p className="text-6xl font-bold text-yellow-500">3</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md">Trudne</p>
              <p className="text-6xl font-bold text-red-500">1</p>
            </div>
          </div>
          <Table className="overflow-clip">
            <TableCaption>Lista wykonanych zadań.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Nazwa</TableHead>
                <TableHead className="w-[200px]">Poziom trudności</TableHead>
                <TableHead className="w-[250px]">Wykonano</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.completedTasks?.map((task, index) => (
                <TableRow key={task.taskId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.taskId}</TableCell>
                  <TableCell>{task.status}</TableCell>
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
