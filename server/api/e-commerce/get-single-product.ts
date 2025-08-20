import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const slug = query?.slug as string

        const products = await prisma.product.findFirst({
            where: { slug },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: true,
                images: true,
                stars: true,
                starPercent: true,
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
        })
     


    return {
        products,

    };
});
