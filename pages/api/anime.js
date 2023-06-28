import prisma from "../../prisma/prismaClient.js";

export default async function handler(req, res) {
    try {
        await prisma.$connect();
        // check if there are any query params
        if (req.query.genre) {
            const genreId = parseInt(req.query.genre);
            const anime = await prisma.anime.findMany({
                where: {
                    genres: {
                        some: {
                            genre_id: genreId,
                        },
                    },
                },
                include: {
                    genres: true,
                    series: true,
                },
            });
            return res.status(200).json(anime);
        }

        // else
        const anime = await prisma.anime.findMany({
            include: {
                genres: true,
                series: true,
            },
        });


        return res.status(200).json(anime);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}