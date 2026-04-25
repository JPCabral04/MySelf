import { AgendaItem } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateAgendaItemDTO = Omit<AgendaItem, 'id' | 'event' | 'task'>

type UpdateAgendaItemDTO = Partial<CreateAgendaItemDTO>

export class AgendaItemRepository {

  async create(data: CreateAgendaItemDTO): Promise<AgendaItem> {
    return prisma.agendaItem.create({ data })
  }

  async findAll(): Promise<AgendaItem[]> {
    return prisma.agendaItem.findMany()
  }

  async findById(id: string): Promise<AgendaItem | null> {
    return prisma.agendaItem.findUnique({
      where: { id }
    })
  }

  async findByUserId(userId: string): Promise<AgendaItem[]> {
    return prisma.agendaItem.findMany({
      where: { userId }
    })
  }

  async update(id: string, data: UpdateAgendaItemDTO): Promise<AgendaItem> {
    return prisma.agendaItem.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<AgendaItem> {
    return prisma.agendaItem.delete({
      where: { id }
    })
  }
}
