import { z } from "zod";

export const MessageSchema = z.object({
  content: z
  .string()
  .min(10, {message: "Content must be atleast of minimum 10 characters"})
  .max(300, {message: "Content must be of maximum 300 characters"})
})

