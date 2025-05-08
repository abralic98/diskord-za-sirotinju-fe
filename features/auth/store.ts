import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/generated/graphql"; // Import the User type
import { getCookie } from "cookies-next/client";
import { CookieKeys } from "@/helpers/cookies";

interface AuthStore {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      token: getCookie(CookieKeys.TOKEN) || null,
      user: null,
      setAuth: (token, user) => {
        set({ token, user }, false, "setAuth");
      },
      clearAuth: () => {
        set({ token: null, user: null }, false, "clearAuth");
      },
    }),
    { name: "AuthStore" },
  ),
);
