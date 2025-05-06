import { CustomPageProps } from "@/helpers/types";
import React from "react";

const ServerPage = async (props: CustomPageProps) => {
  const { serverId } = await props.params;
  return <div className="w-full">My Post: {serverId}</div>;
};

export default ServerPage;

