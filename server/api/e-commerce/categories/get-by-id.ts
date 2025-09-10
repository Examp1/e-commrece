import prisma from "@@/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name as string;

    const product = await prisma.category.findUnique({
        where: {
            name,
        },
        select: {
            products: {
                select: {
                    id: true,
                    name: true,
                    color: true,
                    price: true,
                    old_price: true,
                    slug: true,
                    images: true,
                    stars: {
                        select: {
                            averageStarsRating: true
                        }
                    }
                },
            },
        },
    });

    return product;
});
