import { ServerListSidebar } from "@/components/custom/sidebars/ServerListSidebar";
import { RoomSidebar } from "@/features/dashboard/rooms/RoomSidebar";
import { ServerUsersSidebar } from "@/features/dashboard/servers/ServerUsersSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row justify-start h-dvh w-full">
      <ServerListSidebar />
      <RoomSidebar />
      {children}
      <ServerUsersSidebar />
    </div>
  );
}
