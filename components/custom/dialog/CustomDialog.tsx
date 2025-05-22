import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

export interface CustomDialogProps {
  trigger?: ReactNode;
  header: {
    title?: string;
    description?: string;
    descriptionWarning?: boolean; // neda mi se prepravljat
  };
  content: ReactNode;
  contentClassName?: string;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
export const CustomDialog = ({
  content,
  header,
  trigger,
  open,
  setOpen,
  contentClassName,
}: CustomDialogProps) => {
  return (
    <Dialog open={open ?? open}>
      {trigger && (
        <DialogTrigger
          onClick={() => {
            if (setOpen) {
              setOpen(!open);
            }
          }}
        >
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className={contentClassName}>
        {header.title && (
          <DialogHeader>
            <DialogTitle>{header.title}</DialogTitle>
            <DialogDescription
              className={cn(
                header.descriptionWarning && "font-bold text-red-500",
              )}
            >
              {header.description}
            </DialogDescription>
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
};
