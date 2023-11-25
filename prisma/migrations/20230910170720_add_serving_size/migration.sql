/*
  Warnings:

  - You are about to drop the column `amount` on the `UserFoodRecord` table. All the data in the column will be lost.
  - Added the required column `servingAmount` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFoodRecord" DROP COLUMN "amount",
ADD COLUMN     "servingAmount" TEXT NOT NULL,
ADD COLUMN     "servingSize" TEXT NOT NULL;
