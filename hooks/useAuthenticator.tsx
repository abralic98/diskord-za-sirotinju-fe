import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store";
import { MeQueryDocument, MeQueryQuery } from "@/generated/graphql";
import { queryKeys } from "@/helpers/queryKeys";
import { requestWithAuth } from "@/lib/graphql/client";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next/client";
import { CookieKeys } from "@/helpers/cookies";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";

export const useAuthenticator = () => {
  const { user, setAuth, clearAuth } = useAuthStore();
  const token = getCookie(CookieKeys.TOKEN);
  const { replace } = useRouter();

  const { refetch, isLoading } = useQuery({
    queryKey: [queryKeys.meQuery],
    queryFn: async (): Promise<MeQueryQuery> => {
      return await requestWithAuth<MeQueryQuery>(MeQueryDocument);
    },
    enabled: false,
  });

  const refreshUserInfo = () => {
    if (!token) return;
    refetch()
      .then((res) => {
        const user = res.data?.meQuery;
        if (user?.id) {
          setAuth(token, user);
        } else {
          clearAuth();
        }
      })
      .catch(() => {
        clearAuth();
        replace(routes.login);
      });
  };

  //treba refactor

  useEffect(() => {
    if (token && !user) {
      refetch()
        .then((res) => {
          const user = res.data?.meQuery;
          if (user?.id) {
            setAuth(token, user);
          } else {
            clearAuth();
          }
        })
        .catch(() => {
          clearAuth();
          replace(routes.login);
        });
    }
  }, [token, user, refetch, setAuth, clearAuth]);

  return { refreshUserInfo, isLoading };
};
