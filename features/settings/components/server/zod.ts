
import { z } from "zod";

export const updateServerSchema = z.object({
  name: z.string().min(3, { message: "Server name must have at least 3 characters" }),
  description: z.string().optional()
});

