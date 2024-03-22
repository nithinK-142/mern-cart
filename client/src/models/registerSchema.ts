import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ errorMap: () => ({ message: "Invalid email!" }) })
      .min(6)
      .max(15)
      .email(),
    username: z
      .string()
      .min(3, "Username is too short!")
      .max(15, "Username is too long!"),
    password: z
      .string()
      .min(6, "Password is too short!")
      .max(10, "Password is too long!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

export const defaultValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};
