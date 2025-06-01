import { Center } from "@/components/custom/Center";
import { EmptyLayout } from "@/features/dashboard/components/EmptyLayout";
import React from "react";

const emptyStates = [
  {
    title: "No DM selected",
    description: "Select the conversation or start new one",
  },
];

export const NoDMSelected = () => {
  const randomIndex = Math.floor(Math.random() * emptyStates.length);
  const { title, description } = emptyStates[randomIndex];

  return (
    <Center>
      <EmptyLayout title={title} description={description} />
    </Center>
  );
};
