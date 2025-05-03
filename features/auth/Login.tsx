"use client";

import EZLogoDark from "@/assets/logo/EZLogoDark";
import EZLogoWhite from "@/assets/logo/EZLogoWhite";
import { FormInput } from "@/components/custom/form/FormInput";
import { H1, H3, H4, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import routes from "@/lib/routes";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./zod";
import { client } from "@/lib/graphql/client";
import {
  CreateSessionDocument,
  CreateSessionInput,
  CreateSessionMutation,
  MutationCreateSessionArgs,
} from "@/generated/graphql";
import { useAuthStore } from "./store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GraphqlCatchError, GraphQLErrorResponse } from "@/helpers/errors";
import { unknown } from "zod";

export const Login = () => {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(loginSchema),
  });

  const { push } = useRouter();

  const onSubmit = async (data: CreateSessionInput) => {
    const modifiedData: MutationCreateSessionArgs = {
      credentials: data,
    };
    try {
      console.log("kuracna");
      const res = await client.request<CreateSessionMutation>(
        CreateSessionDocument,
        modifiedData,
      );
      if (res.createSession?.token && res.createSession.user) {
        useAuthStore
          .getState()
          .setAuth(res.createSession.token, res.createSession.user);

        push(routes.dashboard);
      }
    } catch (error) {
      const err = error as GraphqlCatchError;
      toast(err.response.errors[0].message);
    }
  };

  const theme = useTheme();

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-md min-w-[500px] bg-sidebar-accent p-5 rounded-md">
        <div className="w-full flex flex-col items-center gap-md justify-center">
          {theme.theme === "dark" ? <EZLogoDark /> : <EZLogoWhite />}
          <H3>EZComms</H3>
        </div>

        <FormInput<CreateSessionInput> name="username" label="Username" />
        <FormInput<CreateSessionInput> name="password" label="Password" />
        <Link href={routes.register}>
          <Text>Don't have account? Register now!</Text>
        </Link>
        <Checkbox label="Remember me" id="remember-me" />
        <Button
          className="justify-center items-center"
          onClick={form.handleSubmit(onSubmit)} // Handle form submission
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};
