import { z } from "zod";

export const reviewSchema = z.object({
    comment: z
        .string({
            required_error: "Comment is required",
            invalid_type_error: "Comment must bee a string",
        }).min(7, "Comment must be at least 7 characters long"),
});
