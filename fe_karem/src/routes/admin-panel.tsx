import api from '@/api/api'
import { useClasses, User, useUsers } from '@/api/api-endpoints'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Header } from '@/components/typography/Typography'
import { Button } from '@/components/ui/button'
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
import { getCoreRowModel, getPaginationRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import type { Table as TableType } from '@tanstack/react-table'
export const Route = createFileRoute('/admin-panel')({
  component: () => (
    <ProtectedRoute element={<AdminPanel />} minRoleValue={10} />
  ),
})

const Pagination = ({ table }: { table: TableType<User> }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
      <span className="flex items-center gap-1">
        <div>Page</div>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
      </span>
      <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
    </div>
  )
}

function AdminPanel() {
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useUsers()

  const { data: classes } = useClasses();
  console.log('classes', classes);

  const table = useReactTable({
    data: users,
    columns: [
      {
        header: '#',
        accessorFn: (_, index) => index + 1,
      },
      {
        header: 'Nazwa użytkownika',
        accessorKey: 'name',
      },
      {
        header: 'Adres email',
        accessorKey: 'email',
      },
      {
        header: 'Rola',
        accessorKey: 'role',
        cell: ({ row }) => (
          <Select onValueChange={(value) => changeRole(row.original._id, value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`${row.original.role}`} />
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
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  
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
    <>
      <Header variant="h2">
        Panel Administratora
      </Header>
      <div className="flex justify-between items-center mt-8">
        <Header variant="h3">
          Zarejestrowani
        </Header>
        <Pagination table={table} />
      </div>
      <Table>
        <TableCaption>
          Lista wszystkich zarejestrowanych użytkowników.
        </TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={header.id === '#' ? 'w-[50px]' : ''}>
                  {header.column.columnDef.header as string}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </>
  )
}
