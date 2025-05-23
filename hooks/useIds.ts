import { useParams } from "next/navigation";

export const useIds = () => {
  const params = useParams();

  const serverId = params.serverId as string | undefined;
  const roomId = params.roomId as string | undefined;
  const serverSettingsId = params.serverSettingsId as string | undefined;
  const inviteToken = params.inviteToken as string | undefined;

  return { serverId, roomId, serverSettingsId, inviteToken };
};
