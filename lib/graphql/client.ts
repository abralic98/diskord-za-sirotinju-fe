import { GraphQLClient } from "graphql-request";
import { getCookie } from "cookies-next/client";
import { LocalStorageKeys } from "@/helpers/LocalStorage";
import { GraphqlCatchError } from "@/helpers/errors";

const endpoint = "http://localhost:8080/graphql";

const getToken = (): string | undefined => {
  return getCookie(LocalStorageKeys.TOKEN);
};

export const client = new GraphQLClient(endpoint, {
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
    const err = error as GraphqlCatchError
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
