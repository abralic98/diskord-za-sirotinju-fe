import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store";
import { MeQueryDocument, MeQueryQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next/client";
import { CookieKeys } from "@/helpers/cookies";

export const useAuthenticator = () => {
  const { user, setAuth, clearAuth } = useAuthStore();
  const token = getCookie(CookieKeys.TOKEN);

  const { refetch } = useQuery({
    queryKey: [queryKeys.meQuery],
    queryFn: async (): Promise<MeQueryQuery> => {
      return await requestWithAuth<MeQueryQuery>(MeQueryDocument);
    },
    enabled: false,
  });

  useEffect(() => {
    if (token && !user) {
      refetch()
        .then((res) => {
          const user = res.data?.meQuery;
          if (user) {
            setAuth(token, user);
          } else {
            clearAuth();
          }
        })
        .catch(() => {
          clearAuth();
        });
    }
  }, [token, user, refetch, setAuth, clearAuth]);
};
