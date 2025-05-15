"use client";
import React from "react";
import { ServerList } from "./ServerList";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/custom/form/FormInput";
import { Center } from "@/components/custom/Center";

export const FormServerList = () => {
  const form = useForm();
  return (
    <div>
      <FormProvider {...form}>
        <form>
          <div className="flex flex-col gap-md">
            <Center>
              <FormInput
                className="max-w-[300px]"
                placeholder="Search servers..."
                name="search"
              />
            </Center>
            <ServerList />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
