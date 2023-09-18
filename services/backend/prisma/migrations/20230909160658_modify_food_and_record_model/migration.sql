/*
  Warnings:

  - You are about to drop the column `category` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the column `measureLabel` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the column `measureWeight` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the `BaseFood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BaseRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Measure` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicFoodId` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `UserFoodRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MealCategory" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('FOOD', 'RECIPE');

-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_foodId_fkey";

-- AlterTable
ALTER TABLE "UserFoodRecord" DROP COLUMN "category",
DROP COLUMN "data",
DROP COLUMN "imgUrl",
DROP COLUMN "measureLabel",
DROP COLUMN "measureWeight",
ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "mealCategory" "MealCategory",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "publicFoodId" UUID NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "FoodType" NOT NULL;

-- DropTable
DROP TABLE "BaseFood";

-- DropTable
DROP TABLE "BaseRecipe";

-- DropTable
DROP TABLE "Measure";

-- CreateTable
CREATE TABLE "PublicFoodCollection" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicFoodCollection_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicFoodCollection_uuid_key" ON "PublicFoodCollection"("uuid");

-- AddForeignKey
ALTER TABLE "UserFoodRecord" ADD CONSTRAINT "UserFoodRecord_publicFoodId_fkey" FOREIGN KEY ("publicFoodId") REFERENCES "PublicFoodCollection"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
