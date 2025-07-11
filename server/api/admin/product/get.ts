import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const search = query?.search as string;
    const page = parseInt(query?.page as string) || 1;
    const limit = parseInt(query?.limit as string) || 10;

    const [products, total] = await Promise.all([
        // prom1
        prisma.product.findMany({
            where: search
                ? {
                      name: { contains: search, mode: "insensitive" },
                  }
                : {},
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: true,
                images: true,
            },
            skip: (page - 1) * limit,
            take: limit,
        }),
        // prom2
        prisma.product.count({
            where: search
                ? {
                      name: { contains: search, mode: "insensitive" },
                  }
                : {},
        }),
    ]);

    return {
        products,
        metadata: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
