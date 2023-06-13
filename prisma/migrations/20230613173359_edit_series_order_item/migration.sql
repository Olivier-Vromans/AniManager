/*
  Warnings:

  - The primary key for the `SeriesOrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderItemId` on the `SeriesOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `serieOrdersOrder_id` on the `SeriesOrderItem` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `SeriesOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SeriesOrderItem` DROP FOREIGN KEY `SeriesOrderItem_serieOrdersOrder_id_fkey`;

-- AlterTable
ALTER TABLE `SeriesOrderItem` DROP PRIMARY KEY,
    DROP COLUMN `orderItemId`,
    DROP COLUMN `serieOrdersOrder_id`,
    ADD COLUMN `order_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SeriesOrderItem` ADD CONSTRAINT `SeriesOrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `SerieOrders`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
