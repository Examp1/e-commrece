import prisma from "@@/lib/prisma";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    
    const order = await prisma.orders.findUnique({
        where: {
            id: +query?.id
        },
        include: {
            user: true,
        },
    });

    return order;
});
