/*
  Warnings:

  - Changed the type of `measure` on the `RecipeIngredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "measure",
ADD COLUMN     "measure" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Unit";
