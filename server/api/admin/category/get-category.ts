import prisma from "~/lib/prisma";
import { withAuth } from "~/utils/withAuth";
export default withAuth(async (event) => {
    const categories = await prisma.category.findMany();
    return { categories };
});
