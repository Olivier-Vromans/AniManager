/*
  Warnings:

  - You are about to drop the `AnimeGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnimeGenre` DROP FOREIGN KEY `AnimeGenre_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `AnimeGenre` DROP FOREIGN KEY `AnimeGenre_genre_id_fkey`;

-- DropTable
DROP TABLE `AnimeGenre`;
