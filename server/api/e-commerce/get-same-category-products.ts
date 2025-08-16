import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    // const slug = query?.slug as string;
    const categoryId = query?.categoryId as string;

    const products = await prisma.product.findMany({
        where: { categoryId },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            images: true,
        },
    });

    return {
        products,
    };
});
