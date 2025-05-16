import routes from "@/lib/routes";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const UserOptions = () => {
  const { push } = useRouter();
  return (
    <div>
      <SettingsIcon className="cursor-pointer hover:animate-spin" onClick={() => push(routes.account)} />
    </div>
  );
};
