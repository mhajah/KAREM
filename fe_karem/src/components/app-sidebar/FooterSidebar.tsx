import { useUser } from "@/providers/UserProvider";
import { SidebarFooter } from "../ui/sidebar";

export function FooterSidebar() {
  const { user } = useUser();
  return (
    <SidebarFooter>
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-gray-400">{user ? `Logged in as ${user.name}` : "Not logged in"}</span>
      </div>
    </SidebarFooter>
  );
}
