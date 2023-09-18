/*
  Warnings:

  - You are about to drop the `_RecipeToRecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipeId` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_RecipeToRecipeIngredient" DROP CONSTRAINT "_RecipeToRecipeIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToRecipeIngredient" DROP CONSTRAINT "_RecipeToRecipeIngredient_B_fkey";

-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "recipeId" UUID NOT NULL;

-- DropTable
DROP TABLE "_RecipeToRecipeIngredient";

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
