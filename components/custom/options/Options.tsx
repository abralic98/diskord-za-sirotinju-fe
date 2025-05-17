import { EllipsisVertical } from "lucide-react";
import React, { ReactNode } from "react";
import { CustomDialog, CustomDialogProps } from "../dialog/CustomDialog";

interface Option {
  name: string;
  content: ReactNode;
}
interface OptionsType {
  options: Option[];
}
export const Options = ({ options }: OptionsType) => {
  return <EllipsisVertical />;
};

const Option = ({ option }: { option: Option }) => {
  const header: CustomDialogProps["header"] = {
    title: `${option.name} user`,
  };

  return (
    <CustomDialog
      header={header}
      trigger={<EllipsisVertical />}
      content={option.content}
    />
  );
};
