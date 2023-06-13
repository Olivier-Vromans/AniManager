/*
  Warnings:

  - You are about to drop the column `episodeRange` on the `SeriesOrderItem` table. All the data in the column will be lost.
  - Added the required column `from_episode` to the `SeriesOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_episode` to the `SeriesOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SeriesOrderItem` DROP COLUMN `episodeRange`,
    ADD COLUMN `from_episode` INTEGER NOT NULL,
    ADD COLUMN `to_episode` INTEGER NOT NULL;
