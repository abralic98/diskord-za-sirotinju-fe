import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface CustomDialogProps {
  trigger?: ReactNode;
  header: {
    title?: string;
    description?: string;
  };
  content: ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
export const CustomDialog = ({
  content,
  header,
  trigger,
  open,
  setOpen,
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
      <DialogContent>
        {header.title && (
          <DialogHeader>
            <DialogTitle>{header.title}</DialogTitle>
            <DialogDescription>{header.description}</DialogDescription>
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
};
