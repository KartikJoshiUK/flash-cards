/*
  Warnings:

  - Added the required column `hint` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "hint" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL;
