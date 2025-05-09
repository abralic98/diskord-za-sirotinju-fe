import { H4 } from "@/components/typography";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

export interface Setting {
  setting: {
    name: string;
    action: () => void;
  };
}

export const SingleSetting = ({ setting }: Setting) => {
  const pathname = usePathname();
  const currentSetting = pathname.endsWith(`/${setting.name.toLowerCase()}`);

  return (
    <div
      onClick={setting.action}
      className={cn(
        "w-full h-10 flex items-center justify-start pl-5 cursor-pointer rounded-md",
        currentSetting
          ? "bg-active-room hover:bg-active-room-hover"
          : "bg-sidebar-accent hover:bg-sidebar-hover",
      )}
    >
      <H4>{setting.name}</H4>
    </div>
  );
};
