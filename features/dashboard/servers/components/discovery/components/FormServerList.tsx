"use client";
import React from "react";
import { ServerList } from "./ServerList";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/custom/form/FormInput";

export const FormServerList = () => {
  const form = useForm();
  return (
    <div>
      <FormProvider {...form}>
        <form>
          <FormInput placeholder="Search servers..." name="search" />
          <ServerList />
        </form>
      </FormProvider>
    </div>
  );
};
