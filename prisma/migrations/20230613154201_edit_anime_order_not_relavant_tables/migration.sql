/*
  Warnings:

  - The primary key for the `AnimeOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_index` on the `AnimeOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AnimeOrder`
DROP COLUMN `order_index`;