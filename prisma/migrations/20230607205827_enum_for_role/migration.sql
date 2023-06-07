/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
