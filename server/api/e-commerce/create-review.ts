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

    // const customerReview = await prisma.productReview.findFirst({
    //     where: {
    //         productId,
    //         userId,
    //     },
    // });

    // if (customerReview) {
    //     throw createError({
    //         statusCode: 422,
    //         message: "You already review this product",
    //     });
    // }

    await prisma.productReview.create({
        data: {
            userId,
            starNumber,
            productId,
            comment,
        },
    });

    const productStar = await prisma.productStars.findFirst({
        where: {
            productId,
        },
    });

    await createProductStarPercent(productId, starNumber)

    // if prodId exist
    if (productStar) {
        // inc stars
        const actualreceivedStars = productStar?.receivedStars;
        const updStars = actualreceivedStars + starNumber;
        await prisma.productStars.update({
            where: {
                id: productStar?.id,
            },
            data: {
                receivedStars: updStars,
            },
        });
    } else {
        await prisma.productStars.create({
            data: {
                receivedStars: starNumber,
                productId,
            },
        });
    }



    
    return { message: "Review saved successfuly" };
});

async function createProductStarPercent(productId: number, starNumber: number) {
    const starPercentExist = await prisma.productStarPercent.findFirst({
        where: {
            productId,
            star: starNumber
        },
    });
    // if prodId exist
    if (starPercentExist) {
        const nmbTimes = starPercentExist?.times;
        const updTimes = nmbTimes + 1;
        console.log(updTimes);
        await prisma.productStarPercent.update({
            where: {
                id: starPercentExist?.id,
            },
            data: {
                productId,
                star: starNumber,
                times: updTimes,
            },
        });
    } else {
        await prisma.productStarPercent.create({
            data: {
                times: 1,
                productId,
                star: starNumber
            },
        });
    }
}

// productStarPercent
