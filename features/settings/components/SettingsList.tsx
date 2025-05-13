import { ScrollArea } from "@/components/ui/scroll-area";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import React from "react";
import { SingleSetting } from "./SingleSetting";
import { Logo } from "@/features/shared/Logo";

export const SettingsList = () => {
  const { push, back } = useRouter();
  const settings = [
    {
      name: "Account",
      action: () => {
        push(routes.account);
      },
    },
    {
      name: "Voice",
      action: () => {
        push(routes.voice);
      },
    },
    {
      name: "Notifications",
      action: () => {
        push(routes.notifications);
      },
    },
    {
      name: "Back",
      action: () => {
        push(routes.dashboard);
      },
    },
  ];
  const renderSettings = () => {
    return settings.map((s) => {
      return <SingleSetting setting={s} key={s.name} />;
    });
  };

  return (
    <ScrollArea className="h-full w-full rounded-md">
      <div className="overflow-y-scroll pr-5 pl-5 pt-5 w-full flex flex-col gap-md items-center">
        <Logo />
        {renderSettings()}
      </div>
    </ScrollArea>
  );
};
