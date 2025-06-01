import React from "react";
import { AccountBasicInfo } from "./AccountBasicInfo";
import { ChangePassword } from "./ChangePassword";
import { H3, Text } from "@/components/typography";
import { DisableAccount } from "./DisableAccount";
import { DeleteAccount } from "./DeleteAccount";
import { Logout } from "./Logout";

export const AccountSettings = () => {
  return (
    <div className="flex flex-col gap-md justify-start items-start bg-sidebar-accent w-full p-10">
      <H3>My account</H3>
      <AccountBasicInfo />
      <H3>Password and Authentication</H3>
      <ChangePassword />
      <H3>Account Removal</H3>
      <Text>
        Disabling your account means you can recover it at any time after taking
        this action.
      </Text>
      <div className="flex flex-row gap-md items-center">
        <DisableAccount />
        <DeleteAccount />
      </div>
      <H3>Logout</H3>
      <Logout />
    </div>
  );
};
