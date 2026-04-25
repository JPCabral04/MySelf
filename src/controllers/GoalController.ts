import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialType, Goal } from "../../generated/prisma/client";
import { FinancialItemRepository } from "../repositories/FinancialItemRepository";
import { GoalRepository } from "../repositories/GoalRepository";

export class GoalController {
  private goalRepository = new GoalRepository();
  private financialItemRepository = new FinancialItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Goal
    }>,
    reply: FastifyReply
  ) => {
    const goal = request.body;

    const financialItem = await this.financialItemRepository.findById(goal.financialItemId);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.type !== FinancialType.GOAL) {
      return reply.status(400).send({ message: "Financial item type must be GOAL" });
    }

    const json = await this.goalRepository.create(goal);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.goalRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { financialItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;

    const goal = await this.goalRepository.findById(financialItemId);

    if (!goal) {
      return reply.status(404).send({ message: "Goal not found" });
    }

    return reply.status(200).send(goal);
  };

  put = async (
    request: FastifyRequest<{
      Params: { financialItemId: string },
      Body: Partial<Goal>
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;
    const data = request.body;

    const financialItem = await this.financialItemRepository.findById(financialItemId);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.type !== FinancialType.GOAL) {
      return reply.status(400).send({ message: "Financial item type must be GOAL" });
    }

    const goalExists = await this.goalRepository.findById(financialItemId);

    if (!goalExists) {
      return reply.status(404).send({ message: "Goal not found" });
    }

    const updated = await this.goalRepository.update(financialItemId, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { financialItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;

    const goalExists = await this.goalRepository.findById(financialItemId);

    if (!goalExists) {
      return reply.status(404).send({ message: "Goal not found" });
    }

    await this.goalRepository.delete(financialItemId);

    return reply.status(204).send();
  };
}

export const goalController = new GoalController();
