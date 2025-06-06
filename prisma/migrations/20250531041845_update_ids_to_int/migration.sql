-- DropForeignKey
ALTER TABLE `horoscopeprofile` DROP FOREIGN KEY `HoroscopeProfile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `parentinfo` DROP FOREIGN KEY `ParentInfo_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userprofile` DROP FOREIGN KEY `UserProfile_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParentInfo` ADD CONSTRAINT `ParentInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoroscopeProfile` ADD CONSTRAINT `HoroscopeProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
