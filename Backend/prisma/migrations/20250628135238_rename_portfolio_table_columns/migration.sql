/*
  Warnings:

  - You are about to drop the column `investedAmt` on the `mfportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `marketValue` on the `mfportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `roi` on the `mfportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `shortCode` on the `mfportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `investedAmt` on the `stockportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `marketValue` on the `stockportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `roi` on the `stockportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `totalInv` on the `userportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `totalMv` on the `userportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `totalPnl` on the `userportfolio` table. All the data in the column will be lost.
  - You are about to drop the column `totalRoi` on the `userportfolio` table. All the data in the column will be lost.
  - Added the required column `current` to the `MfPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invested` to the `MfPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoCode` to the `MfPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current` to the `StockPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invested` to the `StockPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current` to the `UserPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invested` to the `UserPortfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mfportfolio` DROP COLUMN `investedAmt`,
    DROP COLUMN `marketValue`,
    DROP COLUMN `roi`,
    DROP COLUMN `shortCode`,
    ADD COLUMN `current` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `invested` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `logoCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `returnPercent` DECIMAL(8, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `stockportfolio` DROP COLUMN `investedAmt`,
    DROP COLUMN `marketValue`,
    DROP COLUMN `roi`,
    ADD COLUMN `current` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `invested` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `returnPercent` DECIMAL(8, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `userportfolio` DROP COLUMN `totalInv`,
    DROP COLUMN `totalMv`,
    DROP COLUMN `totalPnl`,
    DROP COLUMN `totalRoi`,
    ADD COLUMN `current` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `invested` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `pnl` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `returnPercent` DECIMAL(8, 2) NOT NULL DEFAULT 0.00;
