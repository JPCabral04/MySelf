import { FastifyReply, FastifyRequest } from "fastify";
import { AgendaType, Event } from "../../generated/prisma/client";
import { AgendaItemRepository } from "../repositories/AgendaItemRepository";
import { EventRepository } from "../repositories/EventRepository";

export class EventController {
  private eventRepository = new EventRepository();
  private agendaItemRepository = new AgendaItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Event
    }>,
    reply: FastifyReply
  ) => {
    const event = request.body;

    const agendaItem = await this.agendaItemRepository.findById(event.agendaItemId);

    if (!agendaItem) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    if (agendaItem.type !== AgendaType.EVENT) {
      return reply.status(400).send({ message: "Agenda item type must be EVENT" });
    }

    const json = await this.eventRepository.create(event);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.eventRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { agendaItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { agendaItemId } = request.params;

    const event = await this.eventRepository.findById(agendaItemId);

    if (!event) {
      return reply.status(404).send({ message: "Event not found" });
    }

    return reply.status(200).send(event);
  };

  put = async (
    request: FastifyRequest<{
      Params: { agendaItemId: string },
      Body: Partial<Event>
    }>,
    reply: FastifyReply
  ) => {
    const { agendaItemId } = request.params;
    const data = request.body;

    const agendaItem = await this.agendaItemRepository.findById(agendaItemId);

    if (!agendaItem) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    if (agendaItem.type !== AgendaType.EVENT) {
      return reply.status(400).send({ message: "Agenda item type must be EVENT" });
    }

    const eventExists = await this.eventRepository.findById(agendaItemId);

    if (!eventExists) {
      return reply.status(404).send({ message: "Event not found" });
    }

    const updated = await this.eventRepository.update(agendaItemId, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { agendaItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { agendaItemId } = request.params;

    const eventExists = await this.eventRepository.findById(agendaItemId);

    if (!eventExists) {
      return reply.status(404).send({ message: "Event not found" });
    }

    await this.eventRepository.delete(agendaItemId);

    return reply.status(204).send();
  };
}

export const eventController = new EventController();
