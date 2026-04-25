import { FastifyReply, FastifyRequest } from "fastify";
import { AgendaItem } from "../../generated/prisma/client";
import { AgendaItemRepository } from "../repositories/AgendaItemRepository";

export class AgendaItemController {
  private agendaItemRepository = new AgendaItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<AgendaItem, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const agendaItem = request.body;
    const json = await this.agendaItemRepository.create(agendaItem);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.agendaItemRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const agendaItem = await this.agendaItemRepository.findById(id);

    if (!agendaItem) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    return reply.status(200).send(agendaItem);
  };

  getByUserId = async (
    request: FastifyRequest<{
      Params: { userId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { userId } = request.params;

    const agendaItems = await this.agendaItemRepository.findByUserId(userId);

    return reply.status(200).send(agendaItems);
  };

  put = async (
    request: FastifyRequest<{
      Params: { id: string },
      Body: Partial<AgendaItem>
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const agendaItemExists = await this.agendaItemRepository.findById(id);

    if (!agendaItemExists) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    const updated = await this.agendaItemRepository.update(id, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const agendaItemExists = await this.agendaItemRepository.findById(id);

    if (!agendaItemExists) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    await this.agendaItemRepository.delete(id);

    return reply.status(204).send();
  };
}

export const agendaItemController = new AgendaItemController();
