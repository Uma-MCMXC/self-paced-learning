/*
  Warnings:

  - You are about to drop the column `course_instructor_id` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_course_instructor_id_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "course_instructor_id";
