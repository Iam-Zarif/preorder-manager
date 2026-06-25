import { z } from "zod";

export const preorderInputSchema = z.object({
  name: z.string().trim().min(1),
  products: z.coerce.number().int().min(1),
  preorderWhen: z.enum(["OUT_OF_STOCK", "REGARDLESS_OF_STOCK"]),
  startsAt: z.string().min(1),
  endsAt: z.string().nullable().optional(),
  status: z.boolean().default(true),
});

export type PreorderInput = z.infer<typeof preorderInputSchema>;
