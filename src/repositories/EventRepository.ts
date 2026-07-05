import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const eventInclude = { agendaItem: true } as const

export type EventWithRelations = Prisma.EventGetPayload<{ include: typeof eventInclude }>

type CreateEventDTO = Omit<EventWithRelations, 'agendaItem'>

type UpdateEventDTO = Partial<CreateEventDTO>

export class EventRepository {

  async create(data: CreateEventDTO): Promise<EventWithRelations> {
    return prisma.event.create({ data, include: eventInclude })
  }

  async findAll(): Promise<EventWithRelations[]> {
    return prisma.event.findMany({ include: eventInclude })
  }

  async findById(agendaItemId: string): Promise<EventWithRelations | null> {
    return prisma.event.findUnique({
      where: { agendaItemId },
      include: eventInclude
    })
  }

  async findByUserId(userId: string): Promise<EventWithRelations[]> {
    return prisma.event.findMany({
      where: { agendaItem: { userId } },
      include: eventInclude
    })
  }

  async update(agendaItemId: string, data: UpdateEventDTO): Promise<EventWithRelations> {
    return prisma.event.update({
      where: { agendaItemId },
      data,
      include: eventInclude
    })
  }

  async delete(agendaItemId: string): Promise<EventWithRelations> {
    return prisma.event.delete({
      where: { agendaItemId },
      include: eventInclude
    })
  }
}
