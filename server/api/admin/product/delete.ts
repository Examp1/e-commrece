import prisma from "~/lib/prisma";
import { deleteProductShema } from "./modules/validate-product";
export default defineEventHandler(async (event) => {
    const { id } = await readBody(event);
    const result = deleteProductShema.safeParse({ id });
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: "Validation error",
            data: result.error.flatten(),
        });
    }

    await prisma.product.delete({
        where: {
            id: id,
        },
    });

    return { message: "Product deleted successfuly" };
});
