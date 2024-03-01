/*
  Warnings:

  - You are about to drop the column `dayCompleted` on the `completed_habits` table. All the data in the column will be lost.
  - You are about to drop the column `habitId` on the `completed_habits` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `completed_habits` table. All the data in the column will be lost.
  - Added the required column `idHabit` to the `completed_habits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `completed_habits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "completed_habits" DROP CONSTRAINT "completed_habits_habitId_fkey";

-- DropForeignKey
ALTER TABLE "completed_habits" DROP CONSTRAINT "completed_habits_userId_fkey";

-- AlterTable
ALTER TABLE "completed_habits" DROP COLUMN "dayCompleted",
DROP COLUMN "habitId",
DROP COLUMN "userId",
ADD COLUMN     "completedHabit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "idHabit" UUID NOT NULL,
ADD COLUMN     "idUser" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "completed_habits" ADD CONSTRAINT "completed_habits_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_habits" ADD CONSTRAINT "completed_habits_idHabit_fkey" FOREIGN KEY ("idHabit") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
