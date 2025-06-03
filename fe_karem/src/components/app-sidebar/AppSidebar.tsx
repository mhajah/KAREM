import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Box, Home, NotebookPen } from "lucide-react";
import { NavMain } from "./NavMain";
import { FooterSidebar } from "./FooterSidebar";
import { algorithmList, reactList } from "@/articles";
import React from "react";

export const AppSidebar = React.memo(() => {
  const menuItems = [
    {
      title: "O projekcie",
      url: "/",
      icon: Home,
    },
    {
      title: "Nauka Reacta",
      icon: NotebookPen,
      items: reactList.map((article) => ({
        title: article.title || article.id,
        url: `/blog/${article.id}`,
      })),
    },
    {
      title: "Nauka algorytmów",
      icon: Box,
      isActive: true,
      items: algorithmList.map((article) => ({
        title: article.title || article.id,
        url: `/blog/${article.id}`,
      })),
    },
    {
      title: "Zadania",
      icon: Box,
      url: "/zadania",
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
});
