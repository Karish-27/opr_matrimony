/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `horoscopeprofile` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileId` on the `parentinfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `HoroscopeProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `ParentInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `HoroscopeProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ParentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `horoscopeprofile` DROP FOREIGN KEY `HoroscopeProfile_userProfileId_fkey`;

-- DropForeignKey
ALTER TABLE `parentinfo` DROP FOREIGN KEY `ParentInfo_userProfileId_fkey`;

-- DropIndex
DROP INDEX `HoroscopeProfile_userProfileId_key` ON `horoscopeprofile`;

-- DropIndex
DROP INDEX `ParentInfo_userProfileId_key` ON `parentinfo`;

-- AlterTable
ALTER TABLE `horoscopeprofile` DROP COLUMN `userProfileId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `parentinfo` DROP COLUMN `userProfileId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `HoroscopeProfile_userId_key` ON `HoroscopeProfile`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `ParentInfo_userId_key` ON `ParentInfo`(`userId`);

-- AddForeignKey
ALTER TABLE `ParentInfo` ADD CONSTRAINT `ParentInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoroscopeProfile` ADD CONSTRAINT `HoroscopeProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
