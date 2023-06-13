-- AlterTable
ALTER TABLE `SerieOrders` MODIFY `order_type` ENUM('Release', 'Chronological', 'Community') NOT NULL;
