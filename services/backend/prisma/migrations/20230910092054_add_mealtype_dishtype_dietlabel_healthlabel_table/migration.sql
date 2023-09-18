/*
  Warnings:

  - You are about to drop the column `cautions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `cuisineType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `dietLabels` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `dishType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `healthLabels` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientLines` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cautions",
DROP COLUMN "cuisineType",
DROP COLUMN "dietLabels",
DROP COLUMN "dishType",
DROP COLUMN "healthLabels",
DROP COLUMN "ingredientLines",
DROP COLUMN "mealType";

-- DropEnum
DROP TYPE "DietLabel";

-- DropEnum
DROP TYPE "HealthLabel";

-- CreateTable
CREATE TABLE "DietLabel" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "recipeId" UUID,
    "foodId" UUID,

    CONSTRAINT "DietLabel_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "HealthLabel" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "recipeId" UUID,
    "foodId" UUID,

    CONSTRAINT "HealthLabel_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Caution" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "recipeId" UUID,
    "foodId" UUID,

    CONSTRAINT "Caution_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CuisineType" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "recipeId" UUID,

    CONSTRAINT "CuisineType_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "MealType" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "recipeId" UUID,

    CONSTRAINT "MealType_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DishType" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "recipeId" UUID,

    CONSTRAINT "DishType_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "DietLabel_uuid_key" ON "DietLabel"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "HealthLabel_uuid_key" ON "HealthLabel"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Caution_uuid_key" ON "Caution"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CuisineType_uuid_key" ON "CuisineType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "MealType_uuid_key" ON "MealType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "DishType_uuid_key" ON "DishType"("uuid");

-- AddForeignKey
ALTER TABLE "DietLabel" ADD CONSTRAINT "DietLabel_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietLabel" ADD CONSTRAINT "DietLabel_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthLabel" ADD CONSTRAINT "HealthLabel_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthLabel" ADD CONSTRAINT "HealthLabel_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caution" ADD CONSTRAINT "Caution_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caution" ADD CONSTRAINT "Caution_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CuisineType" ADD CONSTRAINT "CuisineType_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealType" ADD CONSTRAINT "MealType_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishType" ADD CONSTRAINT "DishType_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
