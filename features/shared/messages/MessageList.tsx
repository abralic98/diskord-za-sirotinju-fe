import { Message } from "@/generated/graphql";
import React from "react";
import { SingleMessage } from "./SingleMessage";

interface Props {
  messages: Message[];
}
export const MessageList = ({ messages }: Props) => {
  return <div>
  {messages.map((m)=>{
    return (
      <SingleMessage key={m.id} message={m}/>
    )
  })}
  </div>;
};
