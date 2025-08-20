-- CreateTable
CREATE TABLE "ProductStars" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "receivedStars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductStars" ADD CONSTRAINT "ProductStars_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
