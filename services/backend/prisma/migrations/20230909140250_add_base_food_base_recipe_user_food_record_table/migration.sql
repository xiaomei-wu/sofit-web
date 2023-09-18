/*
  Warnings:

  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nickName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "nickName" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "BaseFood" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" VARCHAR(255),
    "knownAs" VARCHAR(255),
    "category" VARCHAR(255) NOT NULL,
    "categoryLabel" VARCHAR(255) NOT NULL,
    "imgUrl" TEXT,
    "image" TEXT,
    "enercKcal" DOUBLE PRECISION NOT NULL,
    "procnt" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "chocdf" DOUBLE PRECISION NOT NULL,
    "fibtg" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseFood_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Measure" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "uri" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "foodId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "BaseRecipe" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseRecipe_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserFoodRecord" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "imgUrl" TEXT,
    "data" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "measureWeight" VARCHAR(255) NOT NULL,
    "measureLabel" CHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFoodRecord_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseFood_uuid_key" ON "BaseFood"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_uuid_key" ON "Measure"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "BaseRecipe_uuid_key" ON "BaseRecipe"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserFoodRecord_uuid_key" ON "UserFoodRecord"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "BaseFood"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
