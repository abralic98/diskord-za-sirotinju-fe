"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { PropsWithChildren } from "react";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
