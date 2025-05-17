import { Maybe, Server, UserPresenceType } from "@/generated/graphql";
import { Table } from "@/components/custom/table/Table";
import { UserAvatar } from "@/features/user/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { H4, Text } from "@/components/typography";
import { ReactNode } from "react";
import { CustomDialog } from "@/components/custom/dialog/CustomDialog";
import { ManageUser } from "./ManageUser";

export const ServerUserTable = ({ server }: { server?: Server | null }) => {
  const users = server?.joinedUsers ?? [];
  const columns = [
    "Avatar",
    "Username",
    "Status",
    "Member Since",
    "Role",
    "Actions",
  ];

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
    if (!server?.joinedUsers) return [];
    return server?.joinedUsers?.map((user) => [
      <UserAvatar userAvatar={user?.avatar} />,
      <span>{user?.username}</span>,
      getPresence(user?.userPresence),
      <span>{new Date().toLocaleDateString()}</span>,
      <span>{"Bice jednog dana"}</span>,
      <CustomDialog
        header={{ title: "Manage user" }}
        trigger={<Button>Manage</Button>}
        content={<ManageUser user={user} />}
      />,
    ]);
  };

  return (
    <div className="container mx-auto py-10">
      <Table columns={columns} content={generateRowData()} />
    </div>
  );
};
