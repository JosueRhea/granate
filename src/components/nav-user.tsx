"use client";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export function NavUser() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserButton showName={open} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
