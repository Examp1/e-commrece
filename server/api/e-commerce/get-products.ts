import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const search = query?.search as string;
    const page = parseInt(query?.page as string) || 1;
    const limit = parseInt(query?.limit as string) || 10;

    const filters = [];
    const categories = Array.isArray(query.categories)
        ? query.categories
        : ((query.categories as string) || "")
              .split(",")
              .map(Number)
              .filter((i) => i > 0);
    const colors = Array.isArray(query.colors)
        ? query.colors
        : ((query.colors as string) || "").split(",").filter((i) => i !== '');
    const prices = Array.isArray(query.prices)
        ? query.prices
        : ((query.prices as string) || "")
              .split(",")
              .map(Number)
              .filter((i) => i > 0);

    if (categories.length > 0) {
        filters.push({
            categoryId: { in: categories },
        });
    }
    if (colors.length > 0) {
        filters.push({
            color: { in: colors },
        });
    }
    if (prices.length === 2) {
        filters.push({
            price: { gte: prices[0], lte: prices[1] },
        });
    }

    // colors, categories, prices
    const [products, total] = await Promise.all([
        // prom1
        prisma.product.findMany({
            where: filters.length > 0 ? { AND: filters } : {},
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
