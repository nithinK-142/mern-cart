import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({
        errorMap: (issue, ctx) => {
          console.log(issue);
          if (issue.code === "invalid_string" && ctx.data.includes(" ")) {
            return { message: "Email should not contain whitespaces" };
          }
          return { message: "Invalid email!" };
        },
      })
      .min(6)
      .max(30)
      .email(),
    username: z
      .string()
      .trim()
      .min(3, "Username is too short!")
      .max(20, "Username is too long!"),
    password: z
      .string()
      .trim()
      .min(6, "Password is too short!")
      .max(20, "Password is too long!"),
    confirmPassword: z.string().trim(),
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
