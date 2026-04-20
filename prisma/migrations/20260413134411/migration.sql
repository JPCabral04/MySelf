/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Goal` table. All the data in the column will be lost.
  - The primary key for the `HabitModule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `HabitModule` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `HabitModule` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `HabitModule` table. All the data in the column will be lost.
  - The primary key for the `Investment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Investment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Investment` table. All the data in the column will be lost.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `type` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `AgendaItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `AgendaItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habitId` to the `DailyRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agendaItemId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `FinancialItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FinancialItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialItemId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityId` to the `HabitModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialItemId` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agendaItemId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialItemId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AgendaType" AS ENUM ('TASK', 'EVENT');

-- CreateEnum
CREATE TYPE "FinancialType" AS ENUM ('TRANSACTION', 'GOAL', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('HABIT');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "type" "ActivityType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AgendaItem" ADD COLUMN     "type" "AgendaType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DailyRecord" ADD COLUMN     "habitId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "title",
ADD COLUMN     "agendaItemId" TEXT NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("agendaItemId");

-- AlterTable
ALTER TABLE "FinancialItem" ADD COLUMN     "type" "FinancialType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_pkey",
DROP COLUMN "amount",
DROP COLUMN "id",
ADD COLUMN     "financialItemId" TEXT NOT NULL,
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("financialItemId");

-- AlterTable
ALTER TABLE "HabitModule" DROP CONSTRAINT "HabitModule_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "activityId" TEXT NOT NULL,
ADD CONSTRAINT "HabitModule_pkey" PRIMARY KEY ("activityId");

-- AlterTable
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_pkey",
DROP COLUMN "amount",
DROP COLUMN "id",
ADD COLUMN     "financialItemId" TEXT NOT NULL,
ADD CONSTRAINT "Investment_pkey" PRIMARY KEY ("financialItemId");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "title",
ADD COLUMN     "agendaItemId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("agendaItemId");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "amount",
DROP COLUMN "id",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "financialItemId" TEXT NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("financialItemId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaItem" ADD CONSTRAINT "AgendaItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_agendaItemId_fkey" FOREIGN KEY ("agendaItemId") REFERENCES "AgendaItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_agendaItemId_fkey" FOREIGN KEY ("agendaItemId") REFERENCES "AgendaItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialItem" ADD CONSTRAINT "FinancialItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_financialItemId_fkey" FOREIGN KEY ("financialItemId") REFERENCES "FinancialItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_financialItemId_fkey" FOREIGN KEY ("financialItemId") REFERENCES "FinancialItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_financialItemId_fkey" FOREIGN KEY ("financialItemId") REFERENCES "FinancialItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitModule" ADD CONSTRAINT "HabitModule_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecord" ADD CONSTRAINT "DailyRecord_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "HabitModule"("activityId") ON DELETE CASCADE ON UPDATE CASCADE;
