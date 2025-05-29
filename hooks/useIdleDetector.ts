import {
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserPresenceType,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { useMutation } from "@tanstack/react-query";
import { useIdleTimer } from "react-idle-timer";
import { useAuthenticator } from "./useAuthenticator";
import { handleGraphqlError } from "@/helpers/handleGQLError";
export const useIdleDetector = () => {
  const { refreshUserInfo } = useAuthenticator();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const modifiedData: UpdateUserMutationVariables = {
        user: data,
      };
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      refreshUserInfo();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const timeout = 5 * 60 * 1000;

  const onIdle = () => {
    updateUserMutation.mutateAsync({ userPresence: UserPresenceType.Away });
  };

  const onActive = () => {
    updateUserMutation.mutateAsync({ userPresence: UserPresenceType.Online });
  };

  useIdleTimer({
    timeout: timeout,
    onIdle,
    onActive,
    debounce: 500,
    crossTab: true,
  });
};
