import { toast } from "sonner";
import { GraphqlCatchError } from "./errors";

export const handleGraphqlError = (error: Error | null) => {
  const err = error as unknown as GraphqlCatchError;
  err?.response?.errors[0].message && toast(err.response.errors[0].message);
};
