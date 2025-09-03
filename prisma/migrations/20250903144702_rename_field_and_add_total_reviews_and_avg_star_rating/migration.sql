/*
  Warnings:

  - You are about to drop the column `receivedStars` on the `ProductStars` table. All the data in the column will be lost.
  - Added the required column `averageStarsRating` to the `ProductStars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalReviews` to the `ProductStars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStars` to the `ProductStars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductStars" DROP COLUMN "receivedStars",
ADD COLUMN     "averageStarsRating" INTEGER NOT NULL,
ADD COLUMN     "totalReviews" INTEGER NOT NULL,
ADD COLUMN     "totalStars" INTEGER NOT NULL;
