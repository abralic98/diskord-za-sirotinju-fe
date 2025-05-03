import React, { PropsWithChildren } from "react";

export const Center = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {children}
    </div>
  );
};
