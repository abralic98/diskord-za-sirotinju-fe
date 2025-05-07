"use client";

import EZLogoDark from "@/assets/logo/EZLogoDark";
import EZLogoWhite from "@/assets/logo/EZLogoWhite";
import { FormInput } from "@/components/custom/form/FormInput";
import { H3, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import routes from "@/lib/routes";
import { useTheme } from "next-themes";
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
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { loginSchema } from "../zod";
import { useSetCookie } from "cookies-next";
import { getCookies, setCookie, useGetCookie } from "cookies-next/client";
import { LocalStorageKeys } from "@/helpers/LocalStorage";

export const Login = () => {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(loginSchema),
  });

  const theme = useTheme();

  const { push } = useRouter();
  const getCookie = useGetCookie();

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
        setCookie(LocalStorageKeys.TOKEN, res.createSession.token);
        push(routes.dashboard);
      }
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const onSubmit = async (data: CreateSessionInput) => {
    createSessionMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-md min-w-[500px] bg-sidebar-accent p-5 rounded-md">
        <div className="w-full flex flex-col items-center gap-md justify-center">
          {theme.theme === "dark" ? <EZLogoDark /> : <EZLogoWhite />}
          <H3>EZComms</H3>
        </div>

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
      </div>
    </FormProvider>
  );
};
