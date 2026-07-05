import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const taskInclude = { agendaItem: true, category: true } as const

export type TaskWithRelations = Prisma.TaskGetPayload<{ include: typeof taskInclude }>

type CreateTaskDTO = Omit<Prisma.TaskCreateInput, 'agendaItem' | 'category'> & {
  agendaItemId: string
  categoryId?: string | null
  dueDate?: Date | null
  priority?: string | null
  isCompleted: boolean
}

type UpdateTaskDTO = Partial<CreateTaskDTO>

export class TaskRepository {

  async create(data: Omit<TaskWithRelations, 'agendaItem' | 'category'>): Promise<TaskWithRelations> {
    const { agendaItemId, categoryId, dueDate, priority, isCompleted } = data
    return prisma.task.create({
      data: { agendaItemId, categoryId, dueDate, priority, isCompleted },
      include: taskInclude
    })
  }

  async findAll(): Promise<TaskWithRelations[]> {
    return prisma.task.findMany({ include: taskInclude })
  }

  async findById(agendaItemId: string): Promise<TaskWithRelations | null> {
    return prisma.task.findUnique({
      where: { agendaItemId },
      include: taskInclude
    })
  }

  async findByUserId(userId: string): Promise<TaskWithRelations[]> {
    return prisma.task.findMany({
      where: { agendaItem: { userId } },
      include: taskInclude
    })
  }

  async findByCategoryId(categoryId: string): Promise<TaskWithRelations[]> {
    return prisma.task.findMany({
      where: { categoryId },
      include: taskInclude
    })
  }

  async update(agendaItemId: string, data: UpdateTaskDTO): Promise<TaskWithRelations> {
    const { agendaItemId: _id, ...rest } = data as any
    return prisma.task.update({
      where: { agendaItemId },
      data: rest,
      include: taskInclude
    })
  }

  async delete(agendaItemId: string): Promise<TaskWithRelations> {
    return prisma.task.delete({
      where: { agendaItemId },
      include: taskInclude
    })
  }
}
