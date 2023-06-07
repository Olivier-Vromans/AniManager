/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeSeries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeViewingOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ViewingOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Anime` DROP FOREIGN KEY `Anime_series_id_fkey`;

-- DropForeignKey
ALTER TABLE `AnimeViewingOrder` DROP FOREIGN KEY `AnimeViewingOrder_anime_id_fkey`;

-- DropForeignKey
ALTER TABLE `AnimeViewingOrder` DROP FOREIGN KEY `AnimeViewingOrder_viewingorder_id_fkey`;

-- DropForeignKey
ALTER TABLE `Episode` DROP FOREIGN KEY `Episode_anime_id_fkey`;

-- AlterTable
ALTER TABLE `Episode` MODIFY `episode_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `is_filler` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Anime`;

-- DropTable
DROP TABLE `AnimeSeries`;

-- DropTable
DROP TABLE `AnimeViewingOrder`;

-- DropTable
DROP TABLE `ViewingOrder`;

-- CreateTable
CREATE TABLE `Series` (
    `serie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_name` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Series_serie_name_key`(`serie_name`),
    PRIMARY KEY (`serie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animes` (
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

    UNIQUE INDEX `Animes_title_key`(`title`),
    PRIMARY KEY (`anime_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `genre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `genre_name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Genre_genre_name_key`(`genre_name`),
    UNIQUE INDEX `Genre_url_key`(`url`),
    PRIMARY KEY (`genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SerieOrders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_id` INTEGER NOT NULL,
    `order_type` ENUM('Chronological', 'Release', 'Community') NOT NULL,

    UNIQUE INDEX `SerieOrders_serie_id_key`(`serie_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimeOrder` (
    `animeOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `anime_id` INTEGER NOT NULL,
    `order_index` INTEGER NOT NULL,
    `serie_id` INTEGER NOT NULL,

    PRIMARY KEY (`animeOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimeGenre` (
    `anime_id` INTEGER NOT NULL,
    `genre_id` INTEGER NOT NULL,

    PRIMARY KEY (`anime_id`, `genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnimesToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AnimesToGenre_AB_unique`(`A`, `B`),
    INDEX `_AnimesToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Animes` ADD CONSTRAINT `Animes_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`serie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SerieOrders` ADD CONSTRAINT `SerieOrders_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Series`(`serie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeOrder` ADD CONSTRAINT `AnimeOrder_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeOrder` ADD CONSTRAINT `AnimeOrder_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `SerieOrders`(`serie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeGenre` ADD CONSTRAINT `AnimeGenre_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Animes`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeGenre` ADD CONSTRAINT `AnimeGenre_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`genre_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimesToGenre` ADD CONSTRAINT `_AnimesToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Animes`(`anime_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnimesToGenre` ADD CONSTRAINT `_AnimesToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE;
