import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@/providers/UserProvider';

export const Route = createFileRoute('/profil/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useUser();

  console.log(user);
  
  return (
    <div>
      <h1>Mój profil {user?.name}</h1>
    </div>
  )
}
