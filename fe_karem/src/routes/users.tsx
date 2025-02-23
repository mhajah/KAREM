import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import UsersView from '@/components/users/UsersView'

export const Route = createFileRoute('/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersView />
}
