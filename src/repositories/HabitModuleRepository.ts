import { HabitModule } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateHabitModuleDTO = Omit<HabitModule, 'activity' | 'dailyRecords'>

type UpdateHabitModuleDTO = Partial<CreateHabitModuleDTO>

export class HabitModuleRepository {

  async create(data: CreateHabitModuleDTO): Promise<HabitModule> {
    return prisma.habitModule.create({ data })
  }

  async findAll(): Promise<HabitModule[]> {
    return prisma.habitModule.findMany()
  }

  async findById(activityId: string): Promise<HabitModule | null> {
    return prisma.habitModule.findUnique({
      where: { activityId }
    })
  }

  async update(activityId: string, data: UpdateHabitModuleDTO): Promise<HabitModule> {
    return prisma.habitModule.update({
      where: { activityId },
      data
    })
  }

  async delete(activityId: string): Promise<HabitModule> {
    return prisma.habitModule.delete({
      where: { activityId }
    })
  }
}
