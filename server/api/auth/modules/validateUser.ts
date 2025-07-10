import { z } from "zod";


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

export const registerShema = z.object({
    name: z.string({
        required_error: 'Name is required', 
        invalid_type_error: "Name must bee a string"
    }).min(2, 'Name must be at least 2 characters long'),
    email: z.string({
        required_error: 'Email is required', 
        invalid_type_error: "Email must bee a string"
    }).email('Please provide a valid email address'),
    password: z.string({
        required_error: 'Password is required', 
        invalid_type_error: "Password must bee a string"
    }).min(6, 'Password must be at least 6 characters long')
})

