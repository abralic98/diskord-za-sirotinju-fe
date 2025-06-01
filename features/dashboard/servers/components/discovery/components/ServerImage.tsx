import { H4 } from "@/components/typography";
import { Server } from "@/generated/graphql";
import { ServerIcon } from "lucide-react";
import Image from "next/image";

export const ServerImage = ({ server }: { server?: Server | null }) => {
  const renderBanner = () => {
    if (server?.banner) {
      return (
        <div className="h-[120px]">
          <Image
            alt="server banner"
            width={320}
            height={100}
            src={server.banner}
          />
        </div>
      );
    } else {
      return (
        <div className="w-full h-[120px] bg-sidebar-hover rounded-lg flex items-center justify-center">
          <ServerIcon className="w-[40px] h-[40px]" />
        </div>
      );
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
  return (
    <div className="relative">
      <div className="bg-sidebar-accent rounded-md overflow-hidden">
        {renderBanner()}
      </div>
      <div className="absolute top-15 left-2 rounded-full bg-sidebar w-[90px] h-[90px] overflow-hidden flex items-center justify-center">
        {renderIcon()}
      </div>
    </div>
  );
};
