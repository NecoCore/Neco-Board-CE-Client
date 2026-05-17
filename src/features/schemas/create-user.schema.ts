import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name must be less than 100 characters"),
  login: z.string().min(6, "Login must be at least 50 characters").max(100, "Login must be less than 100 characters").regex(/^[a-zA-Z0-9]+$/, "Login must contain only letters and numbers"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter and one number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type CreateUserFormType = z.infer<typeof CreateUserSchema>;