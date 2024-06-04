import { z } from "zod";

export const registerSchema = z.object({
    phoneNumber: z.string()
        .min(10, { message: 'Phonenumber must be at least 10 characters.' })
        .max(13, {
            message: "Phonenumber must be at least 10 characters.",
        }),
    password: z.string(),
    confirmPassword: z.string().optional(),
    inviteCode: z.string()
})
