// pages/api/series.js
import prisma from '../../../prisma/prismaClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    // Fetch the series based on the serie_id using Prisma
    const series = await prisma.series.findUnique({
      where: {
        serie_id: parseInt(id, 10),
      },
      include: {
        seriesOrder: {
          include: {
            seriesOrderItems: {
              include: {
                anime: {
                  include: {
                    genres: true,
                    episodes: true,
                  },
                },
              },
            },
          },
        },
        animes: {
          include: {
            genres: true,
            episodes: true,
          },
        },
      },
    });

    if (!series) {
      return res.status(404).json({ error: 'Series not found' });
    }

    res.status(200).json(series);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving series' });
  }
}
