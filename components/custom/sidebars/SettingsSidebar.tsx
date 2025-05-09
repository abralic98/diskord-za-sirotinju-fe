import { SettingsList } from "@/features/settings/components/SettingsList";
import React from "react";

export const SettingsSidebar = () => {
  return (
    <div className="min-w-[300px] pl-2 pr-2 bg-sidebar flex items-center justify-center pt-[12px] pb-[12px] h-full">
      <SettingsList />
    </div>
  );
};
