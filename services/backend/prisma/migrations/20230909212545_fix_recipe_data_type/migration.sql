/*
  Warnings:

  - The `mealType` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cuisineType` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dishType` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "mealType",
ADD COLUMN     "mealType" TEXT[],
DROP COLUMN "cuisineType",
ADD COLUMN     "cuisineType" TEXT[],
DROP COLUMN "dishType",
ADD COLUMN     "dishType" TEXT[];
