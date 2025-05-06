import { cn } from "@/lib/utils";
import React from "react";

export const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xl font-semibold">{children}</h4>
);

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-semibold">{children}</h3>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold">{children}</h2>
);

export const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl font-extrabold">{children}</h1>
);

export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label className={cn("text-sm font-semibold", className)}>{children}</label>
);

export default { H4, H3, H2, H1, Text };
