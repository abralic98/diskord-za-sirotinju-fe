import { Center } from "@/components/custom/Center";
import React, { useEffect, useState } from "react";
import {
  EmptyLayout,
  EmptyLayoutRedirection,
} from "../dashboard/components/EmptyLayout";
import NoPermissionIllustration from "@/assets/illustrations/NoPermissionIllustration";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";

type AccessDeniedType = "not found" | "no permission";

interface Props {
  type: AccessDeniedType;
  pushTo: keyof typeof routes;
}
export const AccessDenied = ({ type, pushTo }: Props) => {
  const { push } = useRouter();
  const [countdown, setCountdown] = useState(3);
  const title = type === "no permission" ? "Restricted Area" : "Not found";
  const description =
    type === "no permission"
      ? "You’re not authorized to access this page."
      : "What are you doing here";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          push(pushTo);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [push]);

  const redirection: EmptyLayoutRedirection = {
    title: `You will be redirected in ${countdown} second${countdown !== 1 ? "s" : ""}...`,
    action: () => {
      push(pushTo);
    },
  };

  return (
    <Center>
      <EmptyLayout
        title={title}
        description={description}
        redirection={redirection}
        illustration={
          <NoPermissionIllustration className="w-[200px] h-[200px]" />
        }
      />
    </Center>
  );
};
