import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ errorMap: () => ({ message: "Invalid email!" }) })
    .min(6)
    .max(30)
    .email(),
  username: z
    .string()
    .min(3, "Username is too short!")
    .max(20, "Username is too long!"),
  password: z
    .string()
    .min(6, "Password is too short!")
    .max(20, "Password is too long!"),
});
