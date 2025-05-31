import routes from "@/lib/routes";
import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";

export const GoToDm = () => {
  return (
    <Link
      href={routes.dm}
      className="bg-sidebar-accent hover:bg-sidebar-hover transition-colors duration-200 cursor-pointer font-bold rounded-full w-14 h-14 flex items-center justify-center"
    >
      <MessageSquareIcon />
    </Link>
  );
};
