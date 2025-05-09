import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().nullable().optional(),
  phoneNumber: z.number().nullable().optional(),
  email: z.string().email().nullable().optional(),
});
