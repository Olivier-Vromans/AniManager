/*
  Warnings:

  - You are about to drop the `Animes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SerieOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnimesToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnimeGenre` DROP FOREIGN KEY `AnimeGenre_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `Animes` DROP FOREIGN KEY `Animes_serie_id_fkey`;

-- DropForeignKey
ALTER TABLE `Episode` DROP FOREIGN KEY `Episode_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `SerieOrders` DROP FOREIGN KEY `SerieOrders_serie_id_fkey`;

-- DropForeignKey
ALTER TABLE `SeriesOrderItem` DROP FOREIGN KEY `SeriesOrderItem_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `SeriesOrderItem` DROP FOREIGN KEY `SeriesOrderItem_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `_AnimesToGenre` DROP FOREIGN KEY `_AnimesToGenre_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AnimesToGenre` DROP FOREIGN KEY `_AnimesToGenre_B_fkey`;

-- DropTable
DROP TABLE `Animes`;

-- DropTable
DROP TABLE `SerieOrders`;

-- DropTable
DROP TABLE `_AnimesToGenre`;

-- CreateTable
CREATE TABLE `Anime` (
    `anime_id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL DEFAULT 'No description available yet. Check back later!',
    `release_date` DATETIME(3) NULL,
    `is_dubbed` BOOLEAN NOT NULL DEFAULT false,
    `optional` BOOLEAN NOT NULL DEFAULT false,
    `poster` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,
    `type` ENUM('TV', 'Movie', 'OVA', 'ONA', 'Special') NOT NULL,

    UNIQUE INDEX `Anime_title_key`(`title`),
    PRIMARY KEY (`anime_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SerieOrder` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_id` INTEGER NOT NULL,
    `order_type` ENUM('Release', 'Chronological', 'Community') NOT NULL,

    UNIQUE INDEX `SerieOrder_serie_id_key`(`serie_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnimeToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AnimeToGenre_AB_unique`(`A`, `B`),
    INDEX `_AnimeToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anime` ADD CONSTRAINT `Anime_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`serie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SerieOrder` ADD CONSTRAINT `SerieOrder_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`serie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeGenre` ADD CONSTRAINT `AnimeGenre_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeriesOrderItem` ADD CONSTRAINT `SeriesOrderItem_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeriesOrderItem` ADD CONSTRAINT `SeriesOrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `SerieOrder`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimeToGenre` ADD CONSTRAINT `_AnimeToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Anime`(`anime_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimeToGenre` ADD CONSTRAINT `_AnimeToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE;
