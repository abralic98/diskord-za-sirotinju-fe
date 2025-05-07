import React, { PropsWithChildren } from "react";

export const CenterScreen = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {children}
    </div>
  );
};

export const Center = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
};
