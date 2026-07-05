import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const goalInclude = { financialItem: true } as const

export type GoalWithRelations = Prisma.GoalGetPayload<{ include: typeof goalInclude }>

type CreateGoalDTO = Omit<GoalWithRelations, 'financialItem'>

type UpdateGoalDTO = Partial<CreateGoalDTO>

export class GoalRepository {

  async create(data: CreateGoalDTO): Promise<GoalWithRelations> {
    return prisma.goal.create({ data, include: goalInclude })
  }

  async findAll(): Promise<GoalWithRelations[]> {
    return prisma.goal.findMany({ include: goalInclude })
  }

  async findById(financialItemId: string): Promise<GoalWithRelations | null> {
    return prisma.goal.findUnique({
      where: { financialItemId },
      include: goalInclude
    })
  }

  async findByUserId(userId: string): Promise<GoalWithRelations[]> {
    return prisma.goal.findMany({
      where: { financialItem: { userId } },
      include: goalInclude
    })
  }

  async update(financialItemId: string, data: UpdateGoalDTO): Promise<GoalWithRelations> {
    return prisma.goal.update({
      where: { financialItemId },
      data,
      include: goalInclude
    })
  }

  async delete(financialItemId: string): Promise<GoalWithRelations> {
    return prisma.goal.delete({
      where: { financialItemId },
      include: goalInclude
    })
  }
}
