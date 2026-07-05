import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const habitModuleInclude = { activity: true } as const

export type HabitModuleWithRelations = Prisma.HabitModuleGetPayload<{ include: typeof habitModuleInclude }>

type CreateHabitModuleDTO = Omit<HabitModuleWithRelations, 'activity' | 'dailyRecords'>

type UpdateHabitModuleDTO = Partial<CreateHabitModuleDTO>

export class HabitModuleRepository {

  async create(data: CreateHabitModuleDTO): Promise<HabitModuleWithRelations> {
    return prisma.habitModule.create({ data, include: habitModuleInclude })
  }

  async findAll(): Promise<HabitModuleWithRelations[]> {
    return prisma.habitModule.findMany({ include: habitModuleInclude })
  }

  async findById(activityId: string): Promise<HabitModuleWithRelations | null> {
    return prisma.habitModule.findUnique({
      where: { activityId },
      include: habitModuleInclude
    })
  }

  async findByUserId(userId: string): Promise<HabitModuleWithRelations[]> {
    return prisma.habitModule.findMany({
      where: { activity: { userId } },
      include: habitModuleInclude
    })
  }

  async update(activityId: string, data: UpdateHabitModuleDTO): Promise<HabitModuleWithRelations> {
    return prisma.habitModule.update({
      where: { activityId },
      data,
      include: habitModuleInclude
    })
  }

  async delete(activityId: string): Promise<HabitModuleWithRelations> {
    return prisma.habitModule.delete({
      where: { activityId },
      include: habitModuleInclude
    })
  }
}
