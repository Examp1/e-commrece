import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {

    const { orderId } = await readBody(event);

    const order = await prisma.orders.findUnique({
        where: {
            id: orderId
        }
    })

    if (!order) {
        throw createError({
            statusCode: 422,
            message: "Order not found",
        });
    }

    return order

})