/*
  Warnings:

  - You are about to drop the `user_portfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_portfolio` DROP FOREIGN KEY `user_portfolio_userId_fkey`;

-- DropTable
DROP TABLE `user_portfolio`;
