import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Box, CodeXml, Home, NotebookPen } from "lucide-react";
import { NavMain } from "./NavMain";
import { FooterSidebar } from "./FooterSidebar";

export function AppSidebar() {
  const menuItems = [
    {
      title: "O projekcie",
      url: "/",
      icon: Home,
    },
    {
      title: "Code Runner",
      url: "/code-runner",
      icon: CodeXml,
    },
    {
      title: "Nauka Algorytmów",
      icon: NotebookPen,
      items: [
        { title: "SubItem 2-1", url: "/item2/subitem1" },
        { title: "SubItem 2-2", url: "/item2/subitem2" },
      ],
    },
    {
      title: "Nauka Reacta",
      icon: Box,
      isActive: true,
      items: [
        { title: "SubItem 2-1", url: "/item2/subitem1" },
        { title: "SubItem 2-2", url: "/item2/subitem2" },
      ],
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">KARAM</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <FooterSidebar />
    </Sidebar>
  );
}
