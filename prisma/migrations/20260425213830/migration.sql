-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AgendaItem" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "hexColor" DROP NOT NULL,
ALTER COLUMN "moduleType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DailyRecord" ALTER COLUMN "isCompleted" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "googleEventId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "targetDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HabitModule" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Investment" ALTER COLUMN "estimatedReturn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "dueDate" DROP NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" DROP NOT NULL;
