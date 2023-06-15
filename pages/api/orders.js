import { getSession } from 'next-auth/react';
import prisma from '../../prisma/prismaClient';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const series = await prisma.series.findMany({
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

    const formattedSeries = series.map((serie) => ({
      series_id: serie.serie_id,
      serie_name: serie.serie_name,
      serieOrders: serie.seriesOrder
        ? serie.seriesOrder.map((order) => ({
            order_id: order.order_id,
            order_type: order.order_type,
            animeOrder: order.seriesOrderItems.map((seriesOrderItem) => ({
              order_index: seriesOrderItem.order,
              series_id: seriesOrderItem.serie_id,
              animes: {
                anime_id: seriesOrderItem.anime.anime_id,
                title: seriesOrderItem.anime.title,
                description: seriesOrderItem.anime.description,
                release_date: seriesOrderItem.anime.release_date,
                is_dubbed: seriesOrderItem.anime.is_dubbed,
                optional: seriesOrderItem.anime.optional,
                poster: seriesOrderItem.anime.poster,
                banner: seriesOrderItem.anime.banner,
                type: seriesOrderItem.anime.type,
                genres: seriesOrderItem.anime.genres.map((genre) => ({
                  genre_id: genre.genre_id,
                  genre_name: genre.genre_name,
                  url: genre.url,
                  count: genre.count,
                })),
                episodes: seriesOrderItem.anime.episodes.map((episode) => ({
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
  }
}
