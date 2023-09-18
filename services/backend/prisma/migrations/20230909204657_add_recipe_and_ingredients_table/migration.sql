/*
  Warnings:

  - You are about to drop the column `name` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the column `publicFoodId` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `UserFoodRecord` table. All the data in the column will be lost.
  - You are about to drop the `PublicFoodCollection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `foodId` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeId` to the `UserFoodRecord` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('GENERIC_FOODS', 'PACKAGED_FOODS');

-- CreateEnum
CREATE TYPE "DietLabel" AS ENUM ('HIGH_PROTEIN', 'LOW_FAT', 'LOW_CARB');

-- CreateEnum
CREATE TYPE "HealthLabel" AS ENUM ('LOW_SUGAR', 'PALEO', 'DAIRY_FREE', 'GLUTEN_FREE', 'EGG_FREE', 'PEANUT_FREE', 'TREE_NUT_FREE', 'SOY_FREE', 'FISH_FREE');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('kcal', 'kg', 'g', 'mg');

-- DropForeignKey
ALTER TABLE "UserFoodRecord" DROP CONSTRAINT "UserFoodRecord_publicFoodId_fkey";

-- AlterTable
ALTER TABLE "UserFoodRecord" DROP COLUMN "name",
DROP COLUMN "publicFoodId",
DROP COLUMN "type",
ADD COLUMN     "foodId" UUID NOT NULL,
ADD COLUMN     "recipeId" UUID NOT NULL;

-- DropTable
DROP TABLE "PublicFoodCollection";

-- CreateTable
CREATE TABLE "Food" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "imgUrl" TEXT,
    "category" "FoodCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "measure" "Unit" NOT NULL,
    "food" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "imgUrl" TEXT,
    "source" VARCHAR(255),
    "yield" DOUBLE PRECISION NOT NULL,
    "dietLabels" TEXT[],
    "healthLabels" TEXT[],
    "ingredientLines" TEXT[],
    "mealType" TEXT,
    "calories" DOUBLE PRECISION NOT NULL,
    "cuisineType" TEXT NOT NULL,
    "dishType" TEXT,
    "cautions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Nutrient" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "enerc_Kcal" DOUBLE PRECISION,
    "procnt_g" DOUBLE PRECISION,
    "fat_g" DOUBLE PRECISION,
    "chocdf_g" DOUBLE PRECISION,
    "sugar_g" DOUBLE PRECISION,
    "fibt_g" DOUBLE PRECISION,
    "recipeId" UUID NOT NULL,
    "foodId" UUID NOT NULL,

    CONSTRAINT "Nutrient_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Measure" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "foodId" UUID NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_RecipeToRecipeIngredient" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_uuid_key" ON "Food"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_uuid_key" ON "RecipeIngredient"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_uuid_key" ON "Recipe"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Nutrient_uuid_key" ON "Nutrient"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_uuid_key" ON "Measure"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToRecipeIngredient_AB_unique" ON "_RecipeToRecipeIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToRecipeIngredient_B_index" ON "_RecipeToRecipeIngredient"("B");

-- AddForeignKey
ALTER TABLE "Nutrient" ADD CONSTRAINT "Nutrient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrient" ADD CONSTRAINT "Nutrient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFoodRecord" ADD CONSTRAINT "UserFoodRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFoodRecord" ADD CONSTRAINT "UserFoodRecord_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFoodRecord" ADD CONSTRAINT "UserFoodRecord_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeIngredient" ADD CONSTRAINT "_RecipeToRecipeIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeIngredient" ADD CONSTRAINT "_RecipeToRecipeIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "RecipeIngredient"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
