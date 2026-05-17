import z from "zod";

export const addUserToProjectSchema = z.object({
  userId: z.string().min(1, "User is required"),
  role: z.number().min(0).max(3).default(2),
});

export type AddUserToProjectFormType = z.input<typeof addUserToProjectSchema>;
