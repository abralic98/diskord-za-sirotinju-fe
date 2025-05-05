import { CustomPageProps } from "@/helpers/types";
import React from "react";

const RoomPage = async (props: CustomPageProps) => {
  const { roomId } = await props.params;
  console.log(roomId, "server props");
  return <div>Room: {roomId}</div>;
};

export default RoomPage;
