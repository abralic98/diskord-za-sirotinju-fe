"use client";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

export const DashboardContent = () => {
  const { open } = useSidebar();

  return <div className="p-[12px] w-full bg-sidebar-border">create rooms and severs</div>;
};
