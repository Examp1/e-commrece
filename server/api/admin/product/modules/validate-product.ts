import { z } from "zod";

export const productShema = z.object({
    name: z
        .string({
            required_error: "Product name is required",
            invalid_type_error: "Product name must bee a string",
        })
        .min(4, "Product name must be at least 4 characters long"),
    color: z
        .string({
            required_error: "Color is required",
            invalid_type_error: "Color must bee a string",
        })
        .min(3, "Color must be at least 3 characters long"),
    price: z.union([
        z.number().positive("Price should be greather than 0"),
        z.string({
            required_error: "Price is required",
        }),
    ]),
    categoryId: z.number().positive("Category should be greather than 0"),
});
export const deleteProductShema = z.object({
    id: z.number().positive("Id should be a number"),
});
