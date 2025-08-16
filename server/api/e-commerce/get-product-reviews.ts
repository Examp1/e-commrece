import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const productId = query?.productId as number;

    if (typeof productId === "undefined") {
        throw createError({
            statusCode: 400,
            statusMessage: "Validation Failed",
            data: [{ message: "productId should be a number" }],
        });
    }

    const productReviews = await prisma.product.findMany({
        where: { id: productId },
        include: {
            reviews: true,
        },
    });

    return {
        productReviews,
    };
});
