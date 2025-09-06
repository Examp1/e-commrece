import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const orders = await prisma.orders.findMany({
        // TODO filter
        where: {},
        orderBy: {
            createdAt: "asc",
        },
        omit: {
            userId: true,
        },
        include: {
            user: { select: { name: true } },
        },
    });

    const transformedOrders = orders.map((order) => ({
        ...order,
        user: order.user.name, // превращаем {name: "John"} в "John"
    }));

    return transformedOrders;
});
