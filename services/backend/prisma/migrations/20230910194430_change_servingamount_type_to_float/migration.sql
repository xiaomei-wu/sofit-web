/*
  Warnings:

  - Changed the type of `servingAmount` on the `UserFoodRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserFoodRecord" DROP COLUMN "servingAmount",
ADD COLUMN     "servingAmount" DOUBLE PRECISION NOT NULL;
