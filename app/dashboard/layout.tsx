import { MainSidebar } from "@/components/custom/sidebars/MainSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
    <div className="flex flex-row">
      <MainSidebar />
      {children}
    </div>
  );
}
