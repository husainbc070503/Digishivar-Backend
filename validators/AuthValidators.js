import { z } from "zod";

const Register = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(1, { message: "Name is required" })
        .trim(),

    email: z
        .string({ required_error: 'Email is required' })
        .min(1, { message: "Email is required" })
        .email({ message: 'Invalid email address' }),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: "Password should be of atleast 8 characters long" })
        .max(64, { message: "Password length should not exceed 64" }),

    role: z
        .string({ required_error: 'Role is required' })
        .min(1, { message: "Role is required" })
});

const Login = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, { message: "Email is required" })
        .email({ message: 'Invalid email address' }),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: "Password should be of atleast 8 characters long" })
        .max(64, { message: "Password length should not exceed 64" })
});

export { Register, Login };