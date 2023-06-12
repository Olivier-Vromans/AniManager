import prisma from "../../prisma/prismaClient.js";

export default async function handler(req, res) {
  try {
    await prisma.$connect();
    const featured = await prisma.series.findMany({
      where: {
        is_featured: true,
      },
      include: {
        animes: {},
      },
      take: 3,
    });


    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving series' });
  } finally {
    await prisma.$disconnect();
  }
}