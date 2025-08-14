import prisma from "~/lib/prisma";
import { categoryShema } from "./modules/validate-category";
// import { withAuth } from "~/utils/withAuth";
export default defineEventHandler(async (event) => {
    const { name } = await readBody(event);
    const result = categoryShema.safeParse({ name });
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: "Validation error",
            data: result.error.flatten(),
        });
    }

    const categoryExist = await prisma.category.findUnique({
        where: {
            name: name,
        },
    });

    if (categoryExist) {
        throw createError({
            statusCode: 400,
            message: "This category is alredy been taken",
        });
    }

    const category = await prisma.category.create({
        data: {
            name: name,
        },
    });

    return { message: "Category created successfuly", category };
});
