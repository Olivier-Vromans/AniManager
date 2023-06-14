import prisma from "../../prisma/prismaClient.js";

export default async function handler(req, res) {
    try {
        await prisma.$connect();
        const anime = await prisma.genre.findMany({

        });


        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving series' });
    } finally {
        await prisma.$disconnect();
    }
}