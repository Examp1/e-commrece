import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const orders = await prisma.orders.findMany({
        // TODO filter
        where: {},
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: { select: { name: true } },
        },
    });

    return orders;
});
