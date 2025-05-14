import React from "react";
import { Server } from "@/generated/graphql";
import { H4 } from "@/components/typography";

interface Props {
  server: Server;
}
export const SingleServer = ({ server }: Props) => {
  return (
    <div className="w-[350px] h-[350px] bg-sidebar-accent shadow rounded p-4">
      <H4>{server.name}</H4>
    </div>
  );
};
