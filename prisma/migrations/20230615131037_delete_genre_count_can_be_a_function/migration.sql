/*
  Warnings:

  - You are about to drop the column `count` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the `_AnimeToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AnimeToGenre` DROP FOREIGN KEY `_AnimeToGenre_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AnimeToGenre` DROP FOREIGN KEY `_AnimeToGenre_B_fkey`;

-- AlterTable
ALTER TABLE `Genre` DROP COLUMN `count`;

-- DropTable
DROP TABLE `_AnimeToGenre`;

-- CreateTable
CREATE TABLE `AnimeGenre` (
    `anime_id` INTEGER NOT NULL,
    `genre_id` INTEGER NOT NULL,

    PRIMARY KEY (`anime_id`, `genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnimeGenre` ADD CONSTRAINT `AnimeGenre_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeGenre` ADD CONSTRAINT `AnimeGenre_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`genre_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
