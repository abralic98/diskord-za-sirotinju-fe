import { GraphQLClient } from "graphql-request";
import { getCookie } from "cookies-next/client";
import { GraphqlCatchError } from "@/helpers/errors";
import { CookieKeys } from "@/helpers/cookies";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "undefined";

const getToken = (): string | undefined => {
  return getCookie(CookieKeys.TOKEN);
};

export const client = new GraphQLClient(apiUrl, {
  headers: () => ({
    Authorization: `Bearer ${getToken() || ""}`,
  }),
});

export const requestWithAuth = async <T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> => {
  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    const err = error as GraphqlCatchError;
    const errors = err?.response?.errors;
    if (Array.isArray(errors)) {
      const unauthorized = errors.find(
        (e) =>
          e.message === "Unauthorized" ||
          e?.extensions?.classification === "UNAUTHORIZED",
      );
      if (unauthorized) {
        window.location.href = "/auth/login";
        return Promise.reject(unauthorized);
      }
    }

    throw error;
  }
};
