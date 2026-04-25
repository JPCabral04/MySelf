import { Activity } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateActivityDTO = Omit<Activity, 'id' | 'habitModule'>

type UpdateActivityDTO = Partial<CreateActivityDTO>

export class ActivityRepository {

  async create(data: CreateActivityDTO): Promise<Activity> {
    return prisma.activity.create({ data })
  }

  async findAll(): Promise<Activity[]> {
    return prisma.activity.findMany()
  }

  async findById(id: string): Promise<Activity | null> {
    return prisma.activity.findUnique({
      where: { id }
    })
  }

  async findByUserId(userId: string): Promise<Activity[]> {
    return prisma.activity.findMany({
      where: { userId }
    })
  }

  async update(id: string, data: UpdateActivityDTO): Promise<Activity> {
    return prisma.activity.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<Activity> {
    return prisma.activity.delete({
      where: { id }
    })
  }
}
