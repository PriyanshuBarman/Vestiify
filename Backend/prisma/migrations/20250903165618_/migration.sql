-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `avatar` VARCHAR(191) NULL,
    `balance` DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `tnxType` ENUM('CREDIT', 'DEBIT') NOT NULL,
    `method` ENUM('REGULAR', 'SIP', 'SWP') NOT NULL DEFAULT 'REGULAR',
    `updatedBalance` DECIMAL(15, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `mfOrderId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mf_order` (
    `id` VARCHAR(191) NOT NULL,
    `schemeCode` INTEGER NOT NULL,
    `fundName` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `fundHouseDomain` VARCHAR(191) NOT NULL,
    `fundType` ENUM('EQUITY', 'DEBT', 'HYBRID', 'OTHERS', 'SOLUTION_ORIENTED') NOT NULL,
    `orderType` ENUM('ONE_TIME', 'REDEEM', 'SIP_INSTALLMENT', 'NEW_SIP') NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `amount` DECIMAL(10, 2) NULL,
    `units` DECIMAL(36, 18) NULL,
    `method` ENUM('REGULAR', 'SIP', 'SWP') NOT NULL DEFAULT 'REGULAR',
    `sipId` VARCHAR(191) NULL,
    `processDate` DATE NOT NULL,
    `navDate` DATE NOT NULL,
    `nav` DECIMAL(10, 4) NULL,
    `failureReason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mf_portfolio` (
    `id` VARCHAR(191) NOT NULL,
    `schemeCode` INTEGER NOT NULL,
    `fundName` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `fundType` ENUM('EQUITY', 'DEBT', 'HYBRID', 'OTHERS', 'SOLUTION_ORIENTED') NOT NULL,
    `fundHouseDomain` VARCHAR(191) NOT NULL,
    `units` DECIMAL(36, 18) NOT NULL,
    `invested` DECIMAL(10, 2) NOT NULL,
    `current` DECIMAL(10, 2) NOT NULL,
    `pnl` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `returnPercent` DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    `dayChangePercent` DECIMAL(5, 2) NULL DEFAULT 0.00,
    `dayChangeValue` DECIMAL(10, 2) NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `mf_portfolio_userId_schemeCode_key`(`userId`, `schemeCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mf_holding` (
    `id` VARCHAR(191) NOT NULL,
    `schemeCode` INTEGER NOT NULL,
    `nav` DECIMAL(10, 4) NOT NULL,
    `units` DECIMAL(36, 18) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `portfolioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mf_sip` (
    `id` VARCHAR(191) NOT NULL,
    `sipDate` INTEGER NOT NULL,
    `nextInstallmentDate` DATE NOT NULL,
    `fundName` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `fundCategory` VARCHAR(191) NOT NULL,
    `fundType` ENUM('EQUITY', 'DEBT', 'HYBRID', 'OTHERS', 'SOLUTION_ORIENTED') NOT NULL,
    `schemeCode` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `fundHouseDomain` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `mf_sip_userId_schemeCode_idx`(`userId`, `schemeCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pending_sip_changes` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NULL,
    `sipDate` INTEGER NULL,
    `nextInstallmentDate` DATE NULL,
    `applyDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sipId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pending_sip_changes_userId_sipId_key`(`userId`, `sipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mf_watchlist` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `schemeCode` INTEGER NOT NULL,
    `fundName` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `mf_watchlist_userId_schemeCode_key`(`userId`, `schemeCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_portfolio` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `stockName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `latestPrice` DECIMAL(10, 2) NULL,
    `invested` DECIMAL(10, 2) NOT NULL,
    `current` DECIMAL(10, 2) NOT NULL,
    `pnl` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `returnPercent` DECIMAL(8, 2) NOT NULL DEFAULT 0.00,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stock_portfolio_userId_symbol_key`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_holding` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `stockName` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL,
    `purchaseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_watchlist` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `stockName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `stock_watchlist_userId_symbol_key`(`userId`, `symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_mfOrderId_fkey` FOREIGN KEY (`mfOrderId`) REFERENCES `mf_order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mf_order` ADD CONSTRAINT `mf_order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mf_portfolio` ADD CONSTRAINT `mf_portfolio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mf_holding` ADD CONSTRAINT `mf_holding_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mf_holding` ADD CONSTRAINT `mf_holding_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `mf_portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mf_sip` ADD CONSTRAINT `mf_sip_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pending_sip_changes` ADD CONSTRAINT `pending_sip_changes_sipId_fkey` FOREIGN KEY (`sipId`) REFERENCES `mf_sip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pending_sip_changes` ADD CONSTRAINT `pending_sip_changes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mf_watchlist` ADD CONSTRAINT `mf_watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_portfolio` ADD CONSTRAINT `stock_portfolio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_holding` ADD CONSTRAINT `stock_holding_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_watchlist` ADD CONSTRAINT `stock_watchlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
