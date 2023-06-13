/*
  Warnings:

  - The primary key for the `Episode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `episode_id` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `series_order_item_id` to the `SeriesOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Episode` DROP PRIMARY KEY,
    DROP COLUMN `episode_id`,
    ADD PRIMARY KEY (`anime_id`, `episode_number`);

-- AlterTable
ALTER TABLE `SeriesOrderItem` ADD COLUMN `series_order_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`series_order_item_id`);
