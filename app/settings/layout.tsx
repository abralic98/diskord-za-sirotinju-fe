"use client";
import { SettingsSidebar } from "@/components/custom/sidebars/SettingsSidebar";
import { useAuthenticator } from "@/hooks/useAuthenticator";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //vjerovatno nije najbolje rjesenje zbog useClienta
  useAuthenticator();
  return (
    <div className="flex flex-row justify-start h-dvh w-full">
      <SettingsSidebar />
      {children}
    </div>
  );
}
