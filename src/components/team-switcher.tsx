"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { OrganizationSwitcher } from "@clerk/nextjs";

export function TeamSwitcher() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: !open ? "hide-children" : "",
            },
          }}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
