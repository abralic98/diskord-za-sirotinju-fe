import {
  GetBannedUsersByServerIdDocument,
  GetBannedUsersByServerIdQuery,
  Maybe,
  UserPresenceType,
} from "@/generated/graphql";
import { Table } from "@/components/custom/table/Table";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { H4, Text } from "@/components/typography";
import { ReactNode, useRef } from "react";
import { CustomDialog } from "@/components/custom/dialog/CustomDialog";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/helpers/queryKeys";
import { useIds } from "@/hooks/useIds";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { UnbanUser } from "./UnbanUser";
import { formatDate } from "@/helpers/date";

export const BannedUserTable = () => {
  const { serverSettingsId } = useIds();

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.getBannedUsersByServerId, serverSettingsId],
    enabled: Boolean(serverSettingsId),
    queryFn: async (): Promise<GetBannedUsersByServerIdQuery> => {
      return await requestWithAuth<GetBannedUsersByServerIdQuery>(
        GetBannedUsersByServerIdDocument,
        {
          id: serverSettingsId,
        },
      );
    },
  });

  if (error) {
    const err = error as unknown as GraphqlCatchError;
    toast(err.response.errors[0].message);
  }
  const bannedUsers = data?.getBannedUsersByServerId ?? [];
  const columns = ["Avatar", "Username", "Ban Author", "Ban Date", "Manage"];

  const getPresence = (presence?: Maybe<UserPresenceType>): ReactNode => {
    switch (presence) {
      case UserPresenceType.Online:
        return <Text className="text-green-600">Online</Text>;
      case UserPresenceType.Busy:
        return <Text className="text-red-600">Busy</Text>;
      case UserPresenceType.Away:
        return <Text className="text-yellow-600">Away</Text>;
      case UserPresenceType.Offline:
        return <Text className="text-gray-400">Offline</Text>;
      default:
        return <Text className="text-muted-foreground">Unknown</Text>;
    }
  };

  const generateRowData = (): React.ReactNode[][] => {
    if (!bannedUsers) return [];
    return bannedUsers?.map((user) => [
      <UserAvatar userAvatar={user?.user.avatar} />,
      <Text>{user?.user.username}</Text>,
      <Text>{user?.banAuthor.username}</Text>,
      <Text>{formatDate(user?.dateCreated)}</Text>,
      <UnbanUser user={user} />,
    ]);
  };

  return (
    <div className="container mx-auto py-10">
      <Table columns={columns} content={generateRowData()} />
    </div>
  );
};
