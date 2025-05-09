import EZLogoDark from "@/assets/logo/EZLogoDark";
import EZLogoWhite from "@/assets/logo/EZLogoWhite";
import { H3 } from "@/components/typography";
import { useTheme } from "next-themes";
import React from "react";

export const Logo = () => {
  const theme = useTheme()
  return (
    <div className="w-full flex flex-col items-center gap-md justify-center">
      {theme.theme === "dark" ? <EZLogoDark /> : <EZLogoWhite />}
      <H3>EZComms</H3>
    </div>
  );
};
