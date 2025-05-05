"use client";
import { H2, H3 } from "@/components/typography";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface Props {
  content: ReactNode;
}
export const MainSidebar = ({ content }: Props) => {
  const { open } = useSidebar();
  const appName = open ? "EZComms" : "EZ";
  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarHeader className="bg-red-500 h-10 flex items-start justify-center">
        <H3>{appName}</H3>
      </SidebarHeader>
      <SidebarContent>{content}</SidebarContent>
      <SidebarFooter>user</SidebarFooter>
      <div className="absolute right-0 top-0">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};
