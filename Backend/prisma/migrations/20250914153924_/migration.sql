/*
  Warnings:

  - Made the column `balance` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0;
