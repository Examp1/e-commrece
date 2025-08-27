import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const orders = await prisma.orders.findMany({
        // TODO filter
        where: {},
        orderBy: {
            createdAt: 'desc'
        },
        // include: {
        //     id: true,
        //     total: true,
        //     status: true,
        // }
    })


    return orders

})