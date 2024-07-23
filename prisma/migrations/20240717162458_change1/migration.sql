/*
  Warnings:

  - Added the required column `uid` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::TEXT[];
