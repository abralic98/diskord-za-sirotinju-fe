"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import React from "react";

export const Logout = () => {
  const { clearAuth } = useAuthStore();

  return (
    <Button onClick={clearAuth} variant={"destructive"}>
      Logout
    </Button>
  );
};
