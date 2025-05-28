"use client";
import { BaseCard } from "@/components/custom/card/BaseCard";
import { CenterScreen } from "@/components/custom/Center";
import { H4 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  GetServerByInviteDocument,
  GetServerByInviteQuery,
} from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { JoinServerByInvite } from "./JoinServerByInvite";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const Invite = () => {
  const { inviteToken } = useIds();
  const { replace } = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.getServerByInvite, inviteToken],
    enabled: Boolean(inviteToken),
    queryFn: async (): Promise<GetServerByInviteQuery> => {
      return await requestWithAuth<GetServerByInviteQuery>(
        GetServerByInviteDocument,
        {
          token: inviteToken,
        },
      );
    },
  });

  if (error) {
    handleGraphqlError(error);
  }

  const server = data?.getServerByInvite;

  const renderBanner = () => {
    if (server?.banner) {
      return <Image alt="server banner" fill src={server.banner} />;
    }
  };

  const renderIcon = () => {
    if (server?.serverImg) {
      return (
        <Image
          alt="server icon"
          width={90}
          height={90}
          src={server.serverImg}
        />
      );
    } else {
      if (server?.name) return <H4>{server.name.slice(0, 2)}</H4>;
    }
  };

  if (!server) return null;

  return (
    <div>
      <div className=" w-full">{renderBanner()}</div>
      <CenterScreen>
        <BaseCard className="h-[220px] z-50">
          <H4>{`You are joining`}</H4>
          <div className="w-full flex flex-row gap-md items-center">
            {renderIcon()}
            <H4>{server?.name}</H4>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button
              onClick={() => replace(routes.discover)}
              className="w-[150px]"
              variant={"destructive"}
            >
              Cancel
            </Button>
            <JoinServerByInvite />
          </div>
        </BaseCard>
      </CenterScreen>
    </div>
  );
};
