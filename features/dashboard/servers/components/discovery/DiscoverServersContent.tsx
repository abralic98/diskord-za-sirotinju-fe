import EZLogoDark from "@/assets/logo/EZLogoDark";
import { Center } from "@/components/custom/Center";
import { H1, H3, H4 } from "@/components/typography";
import React from "react";
import { FormServerList } from "./components/FormServerList";
import { Button } from "@/components/ui/button";
import routes from "@/lib/routes";
import Link from "next/link";

export const DiscoverServersContent = () => {
  return (
    <Center>
      <div className="flex flex-col items-center gap-md p-10">
        <div className="flex flex-row gap-md items-center">
          <EZLogoDark />
          <H1>EZComms</H1>
        </div>
        <div className="flex flex-row gap-md">
          <H3 className="font-bold">Discover new servers or</H3>
          <Link href={routes.dashboard}>
            <Button>Go to dashboard</Button>
          </Link>
        </div>
        <FormServerList />
      </div>
    </Center>
  );
};
