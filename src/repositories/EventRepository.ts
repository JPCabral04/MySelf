import { Event } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateEventDTO = Omit<Event, 'agendaItem'>

type UpdateEventDTO = Partial<CreateEventDTO>

export class EventRepository {

  async create(data: CreateEventDTO): Promise<Event> {
    return prisma.event.create({ data })
  }

  async findAll(): Promise<Event[]> {
    return prisma.event.findMany()
  }

  async findById(agendaItemId: string): Promise<Event | null> {
    return prisma.event.findUnique({
      where: { agendaItemId }
    })
  }

  async update(agendaItemId: string, data: UpdateEventDTO): Promise<Event> {
    return prisma.event.update({
      where: { agendaItemId },
      data
    })
  }

  async delete(agendaItemId: string): Promise<Event> {
    return prisma.event.delete({
      where: { agendaItemId }
    })
  }
}
