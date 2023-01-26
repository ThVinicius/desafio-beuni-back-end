/*
  Warnings:

  - You are about to drop the column `setTimeOutId` on the `carts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carts" DROP COLUMN "setTimeOutId";

ALTER TABLE "products"
  ADD CONSTRAINT "Check_if_There_is_Stock" CHECK (stock >= 0);
