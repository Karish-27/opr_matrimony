-- CreateTable
CREATE TABLE `UserProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `dietType` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `career` VARCHAR(191) NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `familyProperty` VARCHAR(191) NOT NULL,
    `expectation` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `caste` VARCHAR(191) NOT NULL,
    `marriageStatus` VARCHAR(191) NOT NULL,
    `profilePhotos` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParentInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userProfileId` INTEGER NOT NULL,
    `fatherName` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `fatherNative` VARCHAR(191) NOT NULL,
    `motherNative` VARCHAR(191) NOT NULL,
    `fatherProfession` VARCHAR(191) NOT NULL,
    `motherProfession` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `brothers` INTEGER NOT NULL,
    `elderBrothers` INTEGER NOT NULL,
    `youngerBrothers` INTEGER NOT NULL,
    `marriedBrothers` INTEGER NOT NULL,
    `sisters` INTEGER NOT NULL,
    `elderSisters` INTEGER NOT NULL,
    `youngerSisters` INTEGER NOT NULL,
    `marriedSisters` INTEGER NOT NULL,

    UNIQUE INDEX `ParentInfo_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HoroscopeProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userProfileId` INTEGER NOT NULL,
    `zodiacSign` VARCHAR(191) NOT NULL,
    `tamilYear` VARCHAR(191) NOT NULL,
    `tamilMonth` VARCHAR(191) NOT NULL,
    `udayathiNatchat` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `birthTime` VARCHAR(191) NOT NULL,
    `starFoot` VARCHAR(191) NOT NULL,
    `ascendant` VARCHAR(191) NOT NULL,
    `birthplace` VARCHAR(191) NOT NULL,
    `natalDirection` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HoroscopeProfile_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParentInfo` ADD CONSTRAINT `ParentInfo_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoroscopeProfile` ADD CONSTRAINT `HoroscopeProfile_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
