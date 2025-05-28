"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import routes from "@/lib/routes";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/lib/graphql/client";
import {
  CreateSessionDocument,
  CreateSessionInput,
  CreateSessionMutation,
  MutationCreateSessionArgs,
} from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { loginSchema } from "../zod";
import { setCookie } from "cookies-next/client";
import { CookieKeys } from "@/helpers/cookies";
import { Logo } from "@/features/shared/Logo";
import { BaseCard } from "@/components/custom/card/BaseCard";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const Login = () => {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(loginSchema),
  });

  const { push } = useRouter();

  const createSessionMutation = useMutation({
    mutationFn: async (data: CreateSessionInput) => {
      const modifiedData: MutationCreateSessionArgs = { credentials: data };
      return client.request<CreateSessionMutation>(
        CreateSessionDocument,
        modifiedData,
      );
    },
    onSuccess: (res) => {
      if (res.createSession?.token && res.createSession.user) {
        useAuthStore
          .getState()
          .setAuth(res.createSession.token, res.createSession.user);
        setCookie(CookieKeys.TOKEN, res.createSession.token);
        push(routes.dashboard);
      }
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const onSubmit = async (data: CreateSessionInput) => {
    createSessionMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <BaseCard>
        <Logo />

        <FormInput<CreateSessionInput> name="username" label="Username" />
        <FormInput<CreateSessionInput>
          name="password"
          secure={true}
          label="Password"
        />
        <Link href={routes.register}>
          <Text>Don't have account? Register now!</Text>
        </Link>
        <Checkbox label="Remember me" id="remember-me" />
        <Button
          isLoading={createSessionMutation.isPending}
          className="justify-center items-center"
          onClick={form.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </BaseCard>
    </FormProvider>
  );
};
