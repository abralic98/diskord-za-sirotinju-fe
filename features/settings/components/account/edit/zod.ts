import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().nullable().optional(),
  phoneNumber: z.number().nullable().optional(),
  email: z.string().email().nullable().optional(),
  desrciption: z.string().nullable().optional(),
});

export const updateUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(30, { message: "Password must be at most 30 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character",
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export const deactivateUserSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
