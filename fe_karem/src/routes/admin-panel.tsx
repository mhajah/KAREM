import api from '@/api/api'
import { useUsers } from '@/api/api-endpoints'
import ProtectedRoute from '@/components/ProtectedRoute'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { roleLevel } from '@/constants'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/admin-panel')({
  component: () => (
    <ProtectedRoute element={<AdminPanel />} minRoleValue={10} />
  ),
})

function AdminPanel() {
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useUsers()

  const changeRole = (userId: string, newRole: string) => {
    api.post('/change-role', { id: userId, role: newRole })
      .then(() => {
        refetch() 
      })
  }

  if (isLoading) {
    return <div>Ładowanie użytkowników…</div>
  }

  if (isError) {
    return <div>Wystąpił błąd podczas pobierania użytkowników.</div>
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Panel Administratora
      </h1>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Zarejestrowani
      </h3>
      <Table>
        <TableCaption>
          Lista wszystkich zarejestrowanych użytkowników.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nazwa użytkownika</TableHead>
            <TableHead>Adres email</TableHead>
            <TableHead>Rola</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select onValueChange={(value) => changeRole(user._id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={`${user.role}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(roleLevel).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
