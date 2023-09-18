-- DropForeignKey
ALTER TABLE "Nutrient" DROP CONSTRAINT "Nutrient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Nutrient" DROP CONSTRAINT "Nutrient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "UserFoodRecord" DROP CONSTRAINT "UserFoodRecord_foodId_fkey";

-- DropForeignKey
ALTER TABLE "UserFoodRecord" DROP CONSTRAINT "UserFoodRecord_recipeId_fkey";

-- AlterTable
ALTER TABLE "Nutrient" ALTER COLUMN "recipeId" DROP NOT NULL,
ALTER COLUMN "foodId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserFoodRecord" ALTER COLUMN "foodId" DROP NOT NULL,
ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Nutrient" ADD CONSTRAINT "Nutrient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrient" ADD CONSTRAINT "Nutrient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFoodRecord" ADD CONSTRAINT "UserFoodRecord_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFoodRecord" ADD CONSTRAINT "UserFoodRecord_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
