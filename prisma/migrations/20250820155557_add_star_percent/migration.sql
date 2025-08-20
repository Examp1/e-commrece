-- CreateTable
CREATE TABLE "ProductStarPercent" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "times" INTEGER NOT NULL,
    "star" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStarPercent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductStarPercent" ADD CONSTRAINT "ProductStarPercent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
