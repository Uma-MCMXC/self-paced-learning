/*
  Warnings:

  - You are about to drop the column `image_url` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "image_url",
ADD COLUMN     "document_url" TEXT;
