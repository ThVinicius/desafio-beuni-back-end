/*
  Warnings:

  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasFreeShipping` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kitManagerVariations` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumQuantity` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "hasFreeShipping" BOOLEAN NOT NULL,
ADD COLUMN     "kitManagerVariations" TEXT NOT NULL,
ADD COLUMN     "minimumQuantity" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;
