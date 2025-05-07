import { Center } from "@/components/custom/Center";
import React from "react";
import { EmptyLayout } from "./EmptyLayout";

const emptyStates = [
  {
    title: "No messages yet",
    description: "Start the conversation and break the silence.",
  },
  {
    title: "This channel is quiet… for now",
    description: "Send the first message to get things rolling.",
  },
  {
    title: "Nothing here yet",
    description: "Type a message below to begin chatting.",
  },
  {
    title: "Be the first to say something",
    description: "This channel is waiting for its first message.",
  },
  {
    title: "Echo… Echo…",
    description: "Nobody’s said anything yet. Want to be the first?",
  },
];

export const NoMessages = () => {
  const randomIndex = Math.floor(Math.random() * emptyStates.length);
  const { title, description } = emptyStates[randomIndex];

  return (
    <Center>
      <EmptyLayout title={title} description={description} />
    </Center>
  );
};
