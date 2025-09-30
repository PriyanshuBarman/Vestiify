/*
  Warnings:

  - Added the required column `fundHouseDomain` to the `mf_watchlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mf_watchlists` ADD COLUMN `fundHouseDomain` VARCHAR(191) NOT NULL;
