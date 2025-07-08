import { z } from "zod";

// export const loginShema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// });

export const loginShema = z.object({
    email: z.string({
        required_error: 'Email is required', 
        invalid_type_error: "Email must bee a string"
    }).email('Please provide a valid email address'),
    password: z.string({
        required_error: 'Password is required', 
        invalid_type_error: "Password must bee a string"
    }).min(6, 'Password must be at least 6 characters long')
})

// export function validUser(body) {
//     const result = loginShema.safeParse(body);

//     if (!result.success) {
//         return sendError(
//             event,
//             createError({
//                 statusCode: 400,
//                 statusMessage: "Validation error",
//                 data: result.error.flatten(),
//             }),
//         );
//     }
// }
