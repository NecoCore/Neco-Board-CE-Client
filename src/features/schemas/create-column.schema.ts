import z from "zod";

export const createColumnSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters"),
});

export type CreateColumnFormType = z.infer<typeof createColumnSchema>;