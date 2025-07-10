import prisma from "~/lib/prisma";
import { categoryShema } from "./modules/validate-category";
export default defineEventHandler(async (event) => {
    const { name, id } = await readBody(event);
    const result = categoryShema.safeParse({ name });
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: "Validation error",
            data: result.error.flatten(),
        });
    }

    const category = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: name,
        },
    });

    return { message: "Category updatede successfuly", category };
});
