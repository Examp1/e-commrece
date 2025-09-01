import prisma from "~/lib/prisma";

export default defineEventHandler((event) => {
    const images = prisma.image.findMany();

    return images;
});
