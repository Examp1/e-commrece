/*
  Warnings:

  - You are about to alter the column `slug` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(200),
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
