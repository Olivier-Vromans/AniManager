-- CreateTable
CREATE TABLE `AnimeSeries` (
    `series_id` INTEGER NOT NULL,
    `series_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`series_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anime` (
    `anime_id` INTEGER NOT NULL,
    `series_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `release_date` DATETIME(3) NULL,
    `is_dubbed` BOOLEAN NULL,
    `optional` BOOLEAN NULL,
    `poster` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,

    PRIMARY KEY (`anime_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ViewingOrder` (
    `viewingorder_id` INTEGER NOT NULL,
    `order_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`viewingorder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnimeViewingOrder` (
    `animeviewingorder_id` INTEGER NOT NULL,
    `anime_id` INTEGER NOT NULL,
    `viewingorder_id` INTEGER NOT NULL,
    `episodes` VARCHAR(191) NOT NULL,
    `episode_sequence` INTEGER NOT NULL,

    PRIMARY KEY (`animeviewingorder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episode` (
    `episode_id` INTEGER NOT NULL,
    `anime_id` INTEGER NOT NULL,
    `episode_number` INTEGER NOT NULL,
    `is_filler` BOOLEAN NOT NULL,

    PRIMARY KEY (`episode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anime` ADD CONSTRAINT `Anime_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `AnimeSeries`(`series_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeViewingOrder` ADD CONSTRAINT `AnimeViewingOrder_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnimeViewingOrder` ADD CONSTRAINT `AnimeViewingOrder_viewingorder_id_fkey` FOREIGN KEY (`viewingorder_id`) REFERENCES `ViewingOrder`(`viewingorder_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_anime_id_fkey` FOREIGN KEY (`anime_id`) REFERENCES `Anime`(`anime_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
