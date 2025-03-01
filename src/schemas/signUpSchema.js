import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast of 2 characters")
    .max(20,"Username can me of maximum 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Usrename must not contain any special characters")

export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email fromat"}),
    password: z.string().min(8, {message: "Username must be atleast of 2 characters"})
})