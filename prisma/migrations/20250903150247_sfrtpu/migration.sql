/*
  Warnings:

  - You are about to alter the column `averageStarsRating` on the `ProductStars` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "ProductStars" ALTER COLUMN "averageStarsRating" SET DATA TYPE DECIMAL(3,2);
