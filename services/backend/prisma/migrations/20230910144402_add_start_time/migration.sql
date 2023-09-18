/*
  Warnings:

  - Added the required column `startTime` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFoodRecord" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
