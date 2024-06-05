import { z } from "zod";

const authSchema = z.object({
  email: z
    .string({ errorMap: () => ({ message: "Invalid email!" }) })
    .min(6)
    .max(50)
    .email(),
  username: z
    .string()
    .min(3, "Username is too short!")
    .max(50, "Username is too long!"),
  password: z
    .string()
    .min(6, "Password is too short!")
    .max(20, "Password is too long!"),
});

export const registerSchema = authSchema.pick({
  email: true,
  username: true,
  password: true,
});

export const loginSchema = authSchema.pick({ username: true, password: true });
