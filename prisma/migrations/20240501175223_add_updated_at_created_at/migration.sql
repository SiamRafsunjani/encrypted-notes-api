/*
  Warnings:

  - The `createdAt` column on the `secret_notes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `secret_notes` table without a default value. This is not possible if the table is not empty.
  - Made the column `note` on table `secret_notes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "secret_notes" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "note" SET NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
