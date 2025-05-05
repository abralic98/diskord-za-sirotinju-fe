import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import React, { ReactNode } from "react";

export interface ContextOption {
  name: string;
  func: () => void;
}
interface Props {
  trigger: ReactNode;
  options: ContextOption[];
}
export const Context = ({ trigger, options }: Props) => {
  const renderOptions = () => {
    if (options.length > 0)
      return options.map((o) => (
        <ContextMenuItem key={o.name} onClick={o.func}>
          {o.name}
        </ContextMenuItem>
      ));
    else return null;
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuContent>{renderOptions()}</ContextMenuContent>
    </ContextMenu>
  );
};
