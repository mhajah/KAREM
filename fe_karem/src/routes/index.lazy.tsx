import { LoginDialog } from '@/components/login/LoginDialog'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LoginDialog />
  )
}
