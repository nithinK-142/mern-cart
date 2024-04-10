import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username is too short!")
    .max(20, "Username is too long!"),
  password: z
    .string()
    .min(6, "Password is too short!")
    .max(20, "Password is too long!"),
});
