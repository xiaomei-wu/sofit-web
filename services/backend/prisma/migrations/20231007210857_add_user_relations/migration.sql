/*
  Warnings:

  - Added the required column `userId` to the `Drink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Energy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Excercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sleep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Symptom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drink" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Energy" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Excercise" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Sleep" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Symptom" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Energy" ADD CONSTRAINT "Energy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Excercise" ADD CONSTRAINT "Excercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sleep" ADD CONSTRAINT "Sleep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptom" ADD CONSTRAINT "Symptom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
