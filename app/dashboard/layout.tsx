import { ServerListSidebar } from "@/components/custom/sidebars/ServerListSidebar";
import { RoomSidebar } from "@/features/dashboard/rooms/RoomSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-dvh">
      <ServerListSidebar />
      <RoomSidebar />
      {children}
    </div>
  );
}
