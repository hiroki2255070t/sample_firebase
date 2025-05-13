import { z } from "zod";

export const BookSchema = z.object({
    title: z.string(),
    author: z.string(),
    dateRead: z.string(),
    ISBN: z.string(),
    tags: z.array(z.string()),
  });
  
export type Book = z.infer<typeof BookSchema>;