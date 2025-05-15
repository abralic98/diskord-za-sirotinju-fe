"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import {  Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import routes from "@/lib/routes";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/lib/graphql/client";
import {
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GraphqlCatchError } from "@/helpers/errors";
import { registerSchema } from "../zod";
import { useMutation } from "@tanstack/react-query";
import { Logo } from "@/features/shared/Logo";

type CreateUserInputModified = {
  confirmPassword: string;
} & CreateUserInput;

export const Register = () => {
  const form = useForm<CreateUserInputModified>({
    resolver: zodResolver(registerSchema),
  });

  const { push } = useRouter();

  const createUserMutation = useMutation({
    mutationFn: async (data: CreateUserInputModified) => {
      const { confirmPassword, ...rest } = data;
      const modifiedData: CreateUserMutationVariables = {
        user: rest,
      };
      const res = await client.request<CreateUserMutation>(
        CreateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      push(routes.login);
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  const onSubmit = async (data: CreateUserInputModified) => {
    createUserMutation.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-md min-w-[500px] bg-sidebar-accent p-5 rounded-md">
        <Logo />

        <FormInput<CreateUserInputModified> name="username" label="Username" />
        <FormInput<CreateUserInputModified> name="email" label="Email" />
        <FormInput<CreateUserInputModified>
          name="password"
          label="Password"
          secure={true}
        />
        <FormInput<CreateUserInputModified>
          name="confirmPassword"
          label="Confirm password"
          secure={true}
        />
        <Link href={routes.login}>
          <Text>Already have account? Login</Text>
        </Link>
        <Checkbox label="Remember me" id="remember-me" />
        <Button
          isLoading={createUserMutation.isPending}
          className="justify-center items-center"
          onClick={form.handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};
