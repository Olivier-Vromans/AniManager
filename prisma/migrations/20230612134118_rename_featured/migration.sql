/*
  Warnings:

  - You are about to drop the column `featured` on the `Series` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Series` DROP COLUMN `featured`,
    ADD COLUMN `is_featured` BOOLEAN NOT NULL DEFAULT false;
