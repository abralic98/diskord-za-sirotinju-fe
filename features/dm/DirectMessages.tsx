import React from "react";
import { ChatHeader } from "./chat/ChatHeader";
import { DirectMessageList } from "./chat/DirectMessagesList";

export const DirectMessages = () => {
  return (
    <div className="bg-sidebar-border w-full ">
      <ChatHeader />
      <DirectMessageList />
    </div>
  );
};
