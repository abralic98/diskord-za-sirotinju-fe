import React from "react";
import { useAuthStore } from "../auth/store";

export const UserInfoFooter = () => {
  const { user } = useAuthStore();
  return <div>{user?.username}</div>;
};
