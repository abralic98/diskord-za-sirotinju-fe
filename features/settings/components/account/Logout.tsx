"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import {
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserPresenceType,
} from "@/generated/graphql";
import { CookieKeys } from "@/helpers/cookies";
import { handleGraphqlError } from "@/helpers/handleGQLError";
import { requestWithAuth } from "@/lib/graphql/client";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import React from "react";

export const Logout = () => {
  const { clearAuth } = useAuthStore();

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      const modifiedData: UpdateUserMutationVariables = {
        user: {
          userPresence: UserPresenceType.Offline,
        },
      };
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      clearAuth();
      setCookie(CookieKeys.TOKEN, undefined);
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  return (
    <Button
      onClick={() => {
        updateUserMutation.mutateAsync();
      }}
      variant={"destructive"}
    >
      Logout
    </Button>
  );
};
