"use client";
import { H2, H3 } from "@/components/typography";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export const MainSidebar = () => {
  const { open } = useSidebar();
  const appName = open ? "EZComms" : "EZ"
  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarHeader className="bg-red-500 h-10 flex items-start justify-center">
        <H3>{appName}</H3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup> grupa 1</SidebarGroup>
        <SidebarGroup> grupa 2</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
        <SidebarGroup> grupa 3</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>user</SidebarFooter>
      <div className="absolute right-0 top-0">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};
