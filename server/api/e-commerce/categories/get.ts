import prisma from "@@/lib/prisma";
export default defineEventHandler(async (event) => {
    const product = await prisma.category.findMany({
        orderBy: {
            id: "desc",
        },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });

    return product;
});
