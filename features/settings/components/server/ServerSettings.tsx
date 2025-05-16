"use client";
import { H3, H4 } from "@/components/typography";
import { EditBasicServerInfoForm } from "./EditBasicServerInfo";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { GetServerByIdDocument, GetServerByIdQuery } from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { GraphqlCatchError } from "@/helpers/errors";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Center } from "@/components/custom/Center";
import { useAuthStore } from "@/features/auth/store";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { EditServerImg } from "./EditServerImg";
import { EditServerBanner } from "./EditServerBanner";
import { ServerSettingCard } from "./components/ServerSettingCard";

export const ServerSettings = () => {
  const { serverSettingsId } = useIds();
  const { user } = useAuthStore();
  const { replace } = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.getServerById, serverSettingsId],
    enabled: Boolean(serverSettingsId),
    queryFn: async (): Promise<GetServerByIdQuery> => {
      return await requestWithAuth<GetServerByIdQuery>(GetServerByIdDocument, {
        id: serverSettingsId,
      });
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }

  const renderContent = () => {
    if (isLoading) return null;
    return (
      <div className="flex flex-row flex-wrap gap-md">
        <ServerSettingCard
          title="Basic info"
          content={<EditBasicServerInfoForm server={data?.getServerById} />}
          className="flex-1"
        />
        <ServerSettingCard
          title="Server Icon"
          description="Upload server icon"
          className="flex-1"
          content={<EditServerImg server={data?.getServerById} />}
        />
        <ServerSettingCard
          title="Server Banner"
          description="Upload server banner"
          className="w-full"
          content={<EditServerBanner server={data?.getServerById} />}
        />
      </div>
    );
  };
  const renderHeader = () => {
    return (
      <div>
        <H3>Server Settings</H3>
        {isLoading && (
          <Center>
            <Loader2Icon className="w-10 h-10 animate-spin" />
          </Center>
        )}
      </div>
    );
  };

  const isUserAllowedHere = data?.getServerById?.createdBy?.id === user?.id;

  if (isLoading) {
    return (
      <div className="bg-sidebar-accent w-full p-4 flex justify-center items-center">
        <Loader2Icon className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!isUserAllowedHere) {
    toast("User cannot edit this server");
    replace(routes.dashboard);
  }

  return (
    <div className="bg-sidebar-accent w-full p-4">
      {isUserAllowedHere && (
        <div className="flex flex-col gap-md">
          {renderHeader()}
          {renderContent()}
        </div>
      )}
    </div>
  );
};
