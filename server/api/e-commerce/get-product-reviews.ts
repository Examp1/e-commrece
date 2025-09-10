import prisma from "@@/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const productId = query?.productId as string;

    if (typeof productId === "undefined") {
        throw createError({
            statusCode: 400,
            statusMessage: "Validation Failed",
            data: [{ message: "productId should be a number" }],
        });
    }

    const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: {
            reviews: true,
            stars: true,
        },
    });

    return {
        avgRating: product?.stars[0].averageStarsRating,
        totalReviews: product?.stars[0].totalReviews,
        reviews: product?.reviews,
    };
});
