import prisma from "~/lib/prisma";
import { productShema } from "./modules/validate-product";
export default defineEventHandler(async (event) => {
    const { name, color, price, categoryId } = await readBody(event);
    const result = productShema.safeParse({ name, color, price, categoryId });
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: "Validation error",
            data: result.error.flatten(),
        });
    }

    const product = await prisma.product.create({
        data: {
            name: name,
            color: color,
            categoryId: categoryId,
            price: price.toString(),
        },
    });

    return { message: "Product created successfuly", product };
});
