import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ModeToggle } from "../ui/modetoggle";
import { Link, useLocation } from "@tanstack/react-router";
import { LoginDialog } from "../login/LoginDialog";
import { useUser } from "@/providers/UserProvider";
import { Button } from "../ui/button";
import { RegisterDialog } from "../login/RegisterDialog";

export default function Header() {
  const location = useLocation();
  const user = useUser();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <header className="top-0 flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border px-4 justify-between text-foreground">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Link to="/">#</Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              return (
                <BreadcrumbItem key={to} className="hidden lg:flex">
                  <BreadcrumbSeparator />
                  <BreadcrumbPage>
                    <Link to={to}>{value}</Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center align-center gap-2 text-foreground">
        {user.isValid ? (
          <Button variant="secondary" onClick={() => user.logout()}>
            Wyloguj się
          </Button>
        ) : (
          <>
            <LoginDialog /> <RegisterDialog />
          </>
        )}
        {user.isValid && user.roleValue >= 10 && (
          <Link to="/admin-panel">
            <Button variant="default">Admin Panel</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
