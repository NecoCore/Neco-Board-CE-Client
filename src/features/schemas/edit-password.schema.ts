import z from "zod";

export const editPasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Must contain uppercase, lowercase and number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type EditPasswordFormType = z.infer<typeof editPasswordSchema>;
