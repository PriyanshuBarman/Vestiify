/*
  Warnings:

  - You are about to alter the column `amount` on the `mf_holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(15,2)`.
  - You are about to alter the column `amount` on the `mf_order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(15,2)`.
  - You are about to alter the column `amount` on the `mf_sip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(15,2)`.
  - You are about to alter the column `amount` on the `pending_sip_changes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(15,2)`.
  - You are about to drop the `stock_holding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_portfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_watchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock_holding` DROP FOREIGN KEY `stock_holding_userId_fkey`;

-- DropForeignKey
ALTER TABLE `stock_portfolio` DROP FOREIGN KEY `stock_portfolio_userId_fkey`;

-- DropForeignKey
ALTER TABLE `stock_watchlist` DROP FOREIGN KEY `stock_watchlist_userId_fkey`;

-- AlterTable
ALTER TABLE `mf_holding` MODIFY `amount` DECIMAL(15, 2) NOT NULL;

-- AlterTable
ALTER TABLE `mf_order` MODIFY `amount` DECIMAL(15, 2) NULL;

-- AlterTable
ALTER TABLE `mf_sip` MODIFY `amount` DECIMAL(15, 2) NOT NULL;

-- AlterTable
ALTER TABLE `pending_sip_changes` MODIFY `amount` DECIMAL(15, 2) NULL;

-- DropTable
DROP TABLE `stock_holding`;

-- DropTable
DROP TABLE `stock_portfolio`;

-- DropTable
DROP TABLE `stock_watchlist`;
