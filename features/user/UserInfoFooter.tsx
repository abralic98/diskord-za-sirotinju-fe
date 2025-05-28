import React from "react";
import { useAuthStore } from "../auth/store";
import { UserAvatar } from "./components/UserAvatar";
import { UserInfo } from "./components/UserInfo";
import { UserOptions } from "./components/UserOptions";
import { useSidebar } from "@/components/ui/sidebar";
import { useVoiceRoomStore } from "../voice/store";
import { PhoneCallIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIds } from "@/hooks/useIds";
import routes from "@/lib/routes";

export const UserInfoFooter = () => {
  const { user } = useAuthStore();
  const { open } = useSidebar();
  const { push } = useRouter();
  const { serverId, roomId } = useIds();
  const { handleLeaveRoom, isUserInVoiceRoom, setIsUserInVoiceRoom } =
    useVoiceRoomStore();

  return (
    <div className="bg-sidebar border border-sidebar-accent w-full h-15 flex flex-row gap-md items-center justify-between p-2">
      <div className="flex flex-row gap-md justify-start items-center">
        <UserAvatar userAvatar={user?.avatar} className="w-7 h-7" />
        {open && <UserInfo user={user} />}
      </div>
      <div className="flex flex-row gap-md">
        {isUserInVoiceRoom && roomId && (
          <PhoneCallIcon
            onClick={() => {
              handleLeaveRoom(roomId, String(user?.id));
              const audio = new Audio("/assets/sound/leave-room.mp3");
              audio.play().catch((error) => {
                console.error("Error playing the audio:", error);
              });
              push(`${routes.dashboard}/${serverId}`);
            }}
          />
        )}
        {open && <UserOptions />}
      </div>
    </div>
  );
};
