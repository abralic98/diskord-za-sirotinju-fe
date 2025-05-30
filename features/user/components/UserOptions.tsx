import routes from "@/lib/routes";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const UserOptions = () => {
  return (
    <Link href={routes.account}>
      <SettingsIcon className="cursor-pointer hover:animate-spin" />
    </Link>
  );
};
