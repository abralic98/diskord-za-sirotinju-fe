import { cn } from "@/lib/utils";
import React from "react";

export const H4 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h4 className={cn("text-xl font-semibold", className)}>{children}</h4>;

export const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h3 className={cn("text-2xl font-semibold", className)}>{children}</h3>;

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

const Typography = { H4, H3, H2, H1, Text };

export default Typography;
