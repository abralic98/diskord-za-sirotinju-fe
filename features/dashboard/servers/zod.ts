import { z } from "zod";

export const createServerSchema = z.object({
  name: z.string().min(1, { message: "Empty field" }),
  publicServer: z.boolean(),
});
