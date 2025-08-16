import prisma from "~/lib/prisma";
import { reviewSchema } from "./modules/validateReview";

export default defineEventHandler(async (event) => {
    const { userId, starNumber, productId, comment } = await readBody(event);

    const result = reviewSchema.safeParse({ comment });

    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Validation Failed",
            data: result.error.flatten(),
        });
    }

    const customerReview = await prisma.productReview.findFirst({
        where: {
            productId,
            userId,
        },
    });

    if (customerReview) {
        throw createError({
            statusCode: 422,
            message: "You already review this product",
        });
    }

    await prisma.productReview.create({
        data: {
            userId,
            starNumber,
            productId,
            comment,
        },
    });

    return { message: "Review saved successfuly" };
});

// productStarPercent
