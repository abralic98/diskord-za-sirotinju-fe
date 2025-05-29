"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/store";
import { UserInfoFooter } from "@/features/user/UserInfoFooter";
import { useIds } from "@/hooks/useIds";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  content: ReactNode;
}
export const InboxSidebar = ({ content }: Props) => {
  const { open } = useSidebar();
  const { serverId } = useIds();
  const { user } = useAuthStore();
  const { push } = useRouter();

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
