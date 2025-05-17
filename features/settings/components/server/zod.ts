
import { z } from "zod";

export const updateServerSchema = z.object({
  name: z.string().min(3, { message: "Server name must have at least 3 characters" }),
  description: z.string().optional()
});


export const banUserSchema = z.object({
  reason: z.string().min(1, { message: "Reason must not be empty" }),
});

