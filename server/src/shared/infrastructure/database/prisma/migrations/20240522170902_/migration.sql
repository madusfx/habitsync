-- DropForeignKey
ALTER TABLE "completed_habits" DROP CONSTRAINT "completed_habits_idHabit_fkey";

-- DropForeignKey
ALTER TABLE "completed_habits" DROP CONSTRAINT "completed_habits_idUser_fkey";

-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_userId_fkey";

-- AlterTable
ALTER TABLE "completed_habits" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_habits" ADD CONSTRAINT "completed_habits_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completed_habits" ADD CONSTRAINT "completed_habits_idHabit_fkey" FOREIGN KEY ("idHabit") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
