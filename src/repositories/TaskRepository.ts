import { Task } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateTaskDTO = Omit<Task, 'agendaItem' | 'category'>

type UpdateTaskDTO = Partial<CreateTaskDTO>

export class TaskRepository {

  async create(data: CreateTaskDTO): Promise<Task> {
    return prisma.task.create({ data })
  }

  async findAll(): Promise<Task[]> {
    return prisma.task.findMany()
  }

  async findById(agendaItemId: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { agendaItemId }
    })
  }

  async findByCategoryId(categoryId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: { categoryId }
    })
  }

  async update(agendaItemId: string, data: UpdateTaskDTO): Promise<Task> {
    return prisma.task.update({
      where: { agendaItemId },
      data
    })
  }

  async delete(agendaItemId: string): Promise<Task> {
    return prisma.task.delete({
      where: { agendaItemId }
    })
  }
}
