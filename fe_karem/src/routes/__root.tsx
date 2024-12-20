import * as React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/header/Header';
import { AppSidebar } from '@/components/app-sidebar/AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className='text-foreground p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </>
  )
}
