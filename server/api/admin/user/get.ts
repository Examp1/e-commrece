import prisma from "@@/lib/prisma";
import { withAuth } from "~/utils/withAuth";
export default withAuth(async (event) => {
    const query = getQuery(event);
    const search = query?.search as string;
    const page = parseInt(query?.page as string) || 1;
    const limit = parseInt(query?.limit as string) || 10;

    const [users, total] = await Promise.all([
        // prom1
        prisma.user.findMany({
            where: search
                ? {
                      name: { contains: search, mode: "insensitive" },
                  }
                : {},
            skip: (page - 1) * limit,
            take: limit,
        }),
        // prom2
        prisma.user.count({
            where: search
                ? {
                      name: { contains: search, mode: "insensitive" },
                  }
                : {},
        }),
    ]);

    return {
        users,
        metadata: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
});
