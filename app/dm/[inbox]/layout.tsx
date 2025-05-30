"use client";
import { InboxUsersSidebar } from "@/features/dm/chat/sidebar/ChatUsersSidebar";

export default function DMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-row justify-start ">
      {children}
      <InboxUsersSidebar />
    </div>
  );
}
