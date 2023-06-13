/*
  Warnings:

  - You are about to drop the `AnimeOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnimeOrder` DROP FOREIGN KEY `AnimeOrder_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `AnimeOrder` DROP FOREIGN KEY `AnimeOrder_serie_id_fkey`;

-- DropTable
DROP TABLE `AnimeOrder`;

-- CreateTable
CREATE TABLE `SeriesOrderItem` (
    `orderItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_id` INTEGER NOT NULL,
    `anime_id` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `episodeRange` VARCHAR(191) NOT NULL,
    `serieOrdersOrder_id` INTEGER NULL,

    PRIMARY KEY (`orderItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SeriesOrderItem` ADD CONSTRAINT `SeriesOrderItem_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`serie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeriesOrderItem` ADD CONSTRAINT `SeriesOrderItem_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeriesOrderItem` ADD CONSTRAINT `SeriesOrderItem_serieOrdersOrder_id_fkey` FOREIGN KEY (`serieOrdersOrder_id`) REFERENCES `SerieOrders`(`order_id`) ON DELETE SET NULL ON UPDATE CASCADE;
