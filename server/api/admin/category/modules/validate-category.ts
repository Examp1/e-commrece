import { z } from "zod";

export const categoryShema = z.object({
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must bee a string",
        })
        .min(4, "Name must be at least 4 characters long"),
});
