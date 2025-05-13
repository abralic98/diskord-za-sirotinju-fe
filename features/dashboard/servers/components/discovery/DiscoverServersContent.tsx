import EZLogoDark from "@/assets/logo/EZLogoDark";
import { Center } from "@/components/custom/Center";
import { H1, H3, H4 } from "@/components/typography";
import React from "react";
import { FormServerList } from "./components/FormServerList";

export const DiscoverServersContent = () => {
  return (
    <Center>
      <div className="flex flex-col gap-md">
        <div className="flex flex-row gap-md items-center">
          <EZLogoDark />
          <H1>EZComms</H1>
        </div>
        <H3 className="font-bold">Discover new servers</H3>
        <FormServerList />
      </div>
    </Center>
  );
};
