/*
  Warnings:

  - You are about to drop the column `url` on the `Genre` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Genre_url_key` ON `Genre`;

-- AlterTable
ALTER TABLE `Genre` DROP COLUMN `url`;
