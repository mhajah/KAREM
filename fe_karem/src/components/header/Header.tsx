import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "../ui/breadcrumb";
import { ModeToggle } from "../ui/modetoggle";
import { useLocation } from "@tanstack/react-router";
import { LoginDialog } from "../login/LoginDialog";

export default function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border px-4 justify-between text-foreground">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{location.pathname}</BreadcrumbPage>
          </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center align-center gap-2 text-foreground">
        <LoginDialog />
        <ModeToggle />
      </div>
  </header>
  );
}