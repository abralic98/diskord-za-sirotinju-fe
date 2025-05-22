import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { SearchIcon } from "lucide-react";

import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { FormInput } from "@/components/custom/form/FormInput";
import { SearchInput } from "@/helpers/types";
import { SearchedMessagesList } from "./SearchedMessagesList";
import { Button } from "@/components/ui/button";

export const SearchMessages = () => {
  const form = useForm<SearchInput>();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const search = form.watch("search");

  const header: CustomDialogProps["header"] = {
    title: `Search results for "${search}"`,
  };

  const onSubmit = () => {
    // Trigger dialog open
    triggerRef.current?.click();
  };

  return (
    <div className="flex items-center">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput<SearchInput>
            icon={<SearchIcon />}
            placeholder="Search messages..."
            name="search"
          />
        </form>
      </FormProvider>

      <CustomDialog
        header={header}
        contentClassName="min-w-[1000px] max-h-[800px] overflow-hidden"
        content={<SearchedMessagesList search={search} />}
        trigger={<Button type="button" className="hidden" ref={triggerRef} />}
      />
    </div>
  );
};
