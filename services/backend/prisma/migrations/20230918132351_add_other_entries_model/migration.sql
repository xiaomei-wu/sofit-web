-- CreateTable
CREATE TABLE "Drink" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "servingAmount" DOUBLE PRECISION NOT NULL,
    "servingSize" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "imgUrl" TEXT,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Energy" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "energyLevel" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Energy_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Excercise" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "intensityLevel" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,

    CONSTRAINT "Excercise_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Sleep" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL,

    CONSTRAINT "Sleep_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "intensityLevel" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Drink_uuid_key" ON "Drink"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Energy_uuid_key" ON "Energy"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Excercise_uuid_key" ON "Excercise"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Sleep_uuid_key" ON "Sleep"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Symptom_uuid_key" ON "Symptom"("uuid");
