import routes from "@/lib/routes";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const DiscoverServers = () => {
  const { push } = useRouter();
  return (
    <Link
      href={routes.discover}
      className="bg-sidebar-accent hover:bg-sidebar-hover transition-colors duration-200 cursor-pointer font-bold rounded-full w-14 h-14 flex items-center justify-center"
    >
      <Globe />
    </Link>
  );
};
