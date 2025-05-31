"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserInfoFooter } from "@/features/user/UserInfoFooter";
import { ReactNode } from "react";

interface Props {
  content: ReactNode;
}
export const InboxSidebar = ({ content }: Props) => {
  return (
    <Sidebar collapsible="icon" className="relative h-full">
      <SidebarContent>{content}</SidebarContent>
      <SidebarFooter>
        <UserInfoFooter />
      </SidebarFooter>
      <div className="absolute right-0 top-0">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};
