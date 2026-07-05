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
    const { userId: _ignored, ...rest } = request.body as AgendaItem;
    const userId = request.user.id;
    const json = await this.agendaItemRepository.create({ ...rest, userId });
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const json = await this.agendaItemRepository.findByUserId(userId);
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

    if (agendaItem.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    return reply.status(200).send(agendaItem);
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

    if (agendaItemExists.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
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

    if (agendaItemExists.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    await this.agendaItemRepository.delete(id);

    return reply.status(204).send();
  };
}

export const agendaItemController = new AgendaItemController();
