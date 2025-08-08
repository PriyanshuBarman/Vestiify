/*
  Warnings:

  - You are about to alter the column `units` on the `mf_holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,4)` to `Decimal(36,18)`.
  - You are about to alter the column `units` on the `mf_portfolio` table. The data in that column could be lost. The data in that column will be cast from `Decimal(30,15)` to `Decimal(36,18)`.
  - You are about to alter the column `quantity` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(36,18)`.

*/
-- AlterTable
ALTER TABLE `mf_holding` MODIFY `units` DECIMAL(36, 18) NOT NULL;

-- AlterTable
ALTER TABLE `mf_portfolio` MODIFY `units` DECIMAL(36, 18) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `quantity` DECIMAL(36, 18) NULL;
