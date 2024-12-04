import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export function AppSidebar() {
  const menuItems = [
    {
      title: "Strona Główna",
      url: "/",
      icon: Home,
    },
    {
      title: "Code Runner",
      url: "/code-runner",
      icon: Home,
    },
    {
      title: "Users",
      url: "/users",
      icon: Home,
    }
  ]
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          KARAM
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon className="w-6 h-6 mr-4" />
                    <span>{item.title}</span>
                  </Link>
                  {/* <a href="#">
                    <item.icon className="w-6 h-6 mr-4" />
                    <span>{item.title}</span>
                  </a> */}

                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
