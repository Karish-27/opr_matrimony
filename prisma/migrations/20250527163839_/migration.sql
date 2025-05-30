/*
  Warnings:

  - A unique constraint covering the columns `[regNo]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `regNo` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `liked` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `regNo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_regNo_key` ON `Profile`(`regNo`);
