import { FormInput } from "@/components/custom/form/FormInput";
import { SearchIcon } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export const SearchMessages = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form>
        <FormInput
          icon={<SearchIcon />}
          placeholder="Search messages..."
          name="search"
        />
      </form>
    </FormProvider>
  );
};
