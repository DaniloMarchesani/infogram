import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(5, { message: "Username is required"}),
    password: z.string().min(8),
    });

export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    username: z.string().min(3, {message: "Username is required"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "The password must be at least 8 characters long"}),
    passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
    message: "passwords do not match",
    path: ["passwordConfirm"]
})

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
    firstName: z.string().min(3, {message: "First name is required"}),
    lastName: z.string().min(3, {message: "Last name is required"}),
    email: z.string().email(),
    birthday: z.string()
})

export type TProfileSchema = z.infer<typeof profileSchema>;

