import z from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Name is required").max(250, "Name must be less than 250 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  text: z.string().optional(),
  priority: z.number().min(0).max(3).default(0),
  status: z.number().min(0).max(3).default(0)
})

export type CreateTaskFormType = z.input<typeof createTaskSchema>;