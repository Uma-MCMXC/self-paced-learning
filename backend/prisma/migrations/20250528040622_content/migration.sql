/*
  Warnings:

  - You are about to drop the column `content_type_id` on the `LessonContent` table. All the data in the column will be lost.
  - Added the required column `lesson_content_type_id` to the `LessonContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LessonContent" DROP CONSTRAINT "LessonContent_content_type_id_fkey";

-- AlterTable
ALTER TABLE "LessonContent" DROP COLUMN "content_type_id",
ADD COLUMN     "lesson_content_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LessonContent" ADD CONSTRAINT "LessonContent_lesson_content_type_id_fkey" FOREIGN KEY ("lesson_content_type_id") REFERENCES "LessonContentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
