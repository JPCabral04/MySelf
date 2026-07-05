import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialItem } from "../../generated/prisma/client";
import { FinancialItemRepository } from "../repositories/FinancialItemRepository";

export class FinancialItemController {
  private financialItemRepository = new FinancialItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<FinancialItem, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const { userId: _ignored, ...rest } = request.body as FinancialItem;
    const userId = request.user.id;
    const json = await this.financialItemRepository.create({ ...rest, userId });
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const json = await this.financialItemRepository.findByUserId(userId);
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const financialItem = await this.financialItemRepository.findById(id);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    return reply.status(200).send(financialItem);
  };

  put = async (
    request: FastifyRequest<{
      Params: { id: string },
      Body: Partial<FinancialItem>
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const financialItemExists = await this.financialItemRepository.findById(id);

    if (!financialItemExists) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItemExists.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    const updated = await this.financialItemRepository.update(id, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const financialItemExists = await this.financialItemRepository.findById(id);

    if (!financialItemExists) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItemExists.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    await this.financialItemRepository.delete(id);

    return reply.status(204).send();
  };
}

export const financialItemController = new FinancialItemController();
