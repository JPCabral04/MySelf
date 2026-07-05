import { DailyRecord } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateDailyRecordDTO = Omit<DailyRecord, 'id' | 'habit'>

type UpdateDailyRecordDTO = Partial<CreateDailyRecordDTO>

export class DailyRecordRepository {

  async create(data: CreateDailyRecordDTO): Promise<DailyRecord> {
    return prisma.dailyRecord.create({ data })
  }

  async findAll(): Promise<DailyRecord[]> {
    return prisma.dailyRecord.findMany()
  }

  async findById(id: string): Promise<DailyRecord | null> {
    return prisma.dailyRecord.findUnique({
      where: { id }
    })
  }

  async findByHabitId(habitId: string): Promise<DailyRecord[]> {
    return prisma.dailyRecord.findMany({
      where: { habitId }
    })
  }

  async findByUserId(userId: string): Promise<DailyRecord[]> {
    return prisma.dailyRecord.findMany({
      where: { habit: { activity: { userId } } }
    })
  }

  async update(id: string, data: UpdateDailyRecordDTO): Promise<DailyRecord> {
    return prisma.dailyRecord.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<DailyRecord> {
    return prisma.dailyRecord.delete({
      where: { id }
    })
  }
}
