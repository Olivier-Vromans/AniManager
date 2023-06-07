import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    await prisma.$connect();
    const series = await prisma.series.findMany({
      include: {
        seriesOrder: {
          include: {
            animeOrders: {
              include: {
                animes: {
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

    const formattedSeries = series.map((serie) => ({
      series_id: serie.serie_id,
      serie_name: serie.serie_name,
      serieOrders: serie.seriesOrder
        ? serie.seriesOrder.map((order) => ({
            order_id: order.order_id,
            Order_type: order.order_type,
            animeOrder: order.animeOrders.map((animeOrder) => ({
              order_index: animeOrder.order_index,
              series_id: animeOrder.serie_id,
              animes: {
                anime_id: animeOrder.animes.anime_id,
                title: animeOrder.animes.title,
                description: animeOrder.animes.description,
                release_date: animeOrder.animes.release_date,
                is_dubbed: animeOrder.animes.is_dubbed,
                optional: animeOrder.animes.optional,
                poster: animeOrder.animes.poster,
                banner: animeOrder.animes.banner,
                type: animeOrder.animes.type,
                genres: animeOrder.animes.genres.map((genre) => ({
                  genre_id: genre.genre_id,
                  genre_name: genre.genre_name,
                  url: genre.url,
                  count: genre.count,
                })),
                episodes: animeOrder.animes.episodes.map((episode) => ({
                  episode_id: episode.episode_id,
                  episode_number: episode.episode_number,
                  is_filler: episode.is_filler,
                })),
              },
            })),
          }))
        : [],
      animes: serie.animes.map((anime) => ({
        anime_id: anime.anime_id,
        title: anime.title,
        description: anime.description,
        release_date: anime.release_date,
        is_dubbed: anime.is_dubbed,
        optional: anime.optional,
        poster: anime.poster,
        banner: anime.banner,
        type: anime.type,
        genres: anime.genres.map((genre) => ({
          genre_id: genre.genre_id,
          genre_name: genre.genre_name,
          url: genre.url,
          count: genre.count,
        })),
        episodes: anime.episodes.map((episode) => ({
          episode_id: episode.episode_id,
          episode_number: episode.episode_number,
          is_filler: episode.is_filler,
        })),
      })),
    }));

    res.status(200).json(formattedSeries);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving series' });
  } finally {
    await prisma.$disconnect();
  }
}
