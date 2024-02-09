import { z } from "zod";

export const registerValidation = z.object({
    name: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Invalid email",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export const loginValidation = z.object({
    email: z.string().email({
        message: "Invalid email",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export const updateValidation = z.object({
    name: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }).optional(),
    email: z.string().email({
        message: "Invalid email",
    }).optional(),
    age: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }),
    dob: z.coerce.date().optional(),
    contact: z.string().optional(),
});