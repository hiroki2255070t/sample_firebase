import { z } from "zod";

export const HistorySchema = z.object({
  year: z.number(),
  month: z.number(),
  event: z.string(),
});

export type History = z.infer<typeof HistorySchema>;
