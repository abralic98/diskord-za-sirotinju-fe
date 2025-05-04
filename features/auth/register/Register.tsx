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
import { client } from "@/lib/graphql/client";
import {
  CreateSessionDocument,
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { registerSchema } from "../zod";

type ExtraInput = {
  confirm_password: string;
};
export const Register = () => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(registerSchema),
  });

  const { push } = useRouter();

  const onSubmit = async (data: CreateUserInput & ExtraInput) => {
    const { confirm_password, ...rest } = data;
    const modifiedData: CreateUserMutationVariables = {
      user: rest,
    };
    try {
      const res = await client.request<CreateUserMutation>(
        CreateUserDocument,
        modifiedData,
      );
      if (res.createUser?.id) {
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

        <FormInput<CreateUserInput> name="username" label="Username" />
        <FormInput<CreateUserInput> name="email" label="Email" />
        <FormInput<CreateUserInput>
          name="password"
          label="Password"
          secure={true}
        />
        <FormInput<CreateUserInput>
          name="confirm_password"
          label="Confirm password"
          secure={true}
        />
        <Link href={routes.login}>
          <Text>Already have account? Login</Text>
        </Link>
        <Checkbox label="Remember me" id="remember-me" />
        <Button
          className="justify-center items-center"
          onClick={form.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};
