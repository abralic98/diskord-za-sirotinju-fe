import { SettingsSidebar } from "@/components/custom/sidebars/SettingsSidebar";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row justify-start h-dvh w-full">
      <SettingsSidebar />
      {children}
    </div>
  );
}
