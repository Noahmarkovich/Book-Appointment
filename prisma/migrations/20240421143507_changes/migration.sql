/*
  Warnings:

  - You are about to drop the column `cost` on the `Treatment` table. All the data in the column will be lost.
  - Added the required column `price` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "cost",
ADD COLUMN     "price" INTEGER NOT NULL;
