"use client";
import { ServerListSidebar } from "@/components/custom/sidebars/ServerListSidebar";
import { DMSidebar } from "@/features/dm/DMSidebar";
import { useAuthenticator } from "@/hooks/useAuthenticator";

export default function DMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthenticator();
  return (
    <div className="flex flex-row justify-start h-dvh w-full">
      <ServerListSidebar />
      <DMSidebar/>
      {children}
    </div>
  );
}
