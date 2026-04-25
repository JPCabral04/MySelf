import { Goal } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateGoalDTO = Omit<Goal, 'financialItem'>

type UpdateGoalDTO = Partial<CreateGoalDTO>

export class GoalRepository {

  async create(data: CreateGoalDTO): Promise<Goal> {
    return prisma.goal.create({ data })
  }

  async findAll(): Promise<Goal[]> {
    return prisma.goal.findMany()
  }

  async findById(financialItemId: string): Promise<Goal | null> {
    return prisma.goal.findUnique({
      where: { financialItemId }
    })
  }

  async update(financialItemId: string, data: UpdateGoalDTO): Promise<Goal> {
    return prisma.goal.update({
      where: { financialItemId },
      data
    })
  }

  async delete(financialItemId: string): Promise<Goal> {
    return prisma.goal.delete({
      where: { financialItemId }
    })
  }
}
