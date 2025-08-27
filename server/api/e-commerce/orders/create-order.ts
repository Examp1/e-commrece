import prisma from "~/lib/prisma";

enum EStatus {
    IN_PROGRESS = "in_process",
    SUCCESS = "success",
    CANCELED = "canceled",
}

export default defineEventHandler(async (event) => {
    const { userId, products } = await readBody(event);

    const userExist = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    if (!userExist) {
        throw createError({
            statusCode: 422,
            message: "User not found",
        });
    }

    function getTotalPrice() {
        return products.reduce((acc: number, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }

    // await prisma.$transaction(async (tx) => {
    const order = await prisma.orders.create({
        data: {
            userId,
            total: getTotalPrice(),
            status: EStatus.IN_PROGRESS,
        },
    });

    for (const product of products) {
        await prisma.ordersProducts.create({
            data: {
                orderId: order.id,
                productId: product.id,
                quantity: product.quantity,
            },
        });
    }
    // });

    return { message: "Orded created successfuly" };
});
