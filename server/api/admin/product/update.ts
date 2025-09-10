import prisma from "@@/lib/prisma";
import { productShema } from "./modules/validate-product";
import slugify from "slugify";
export default defineEventHandler(async (event) => {
    const { id, name, color, price, categoryId, old_price, description } = await readBody(event);
    const result = productShema.safeParse({ name, color, price, categoryId });
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: "Validation error",
            data: result.error.flatten(),
        });
    }

    const product = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            slug: slugify(name),
            color: color,
            categoryId: categoryId.id,
            description: description,
            price: price.toString(),
            old_price: old_price.toString(),
        },
    });

    return { message: "Product updated successfuly", product };
});