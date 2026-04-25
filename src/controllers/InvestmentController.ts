import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialType, Investment } from "../../generated/prisma/client";
import { FinancialItemRepository } from "../repositories/FinancialItemRepository";
import { InvestmentRepository } from "../repositories/InvestmentRepository";

export class InvestmentController {
  private investmentRepository = new InvestmentRepository();
  private financialItemRepository = new FinancialItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Investment
    }>,
    reply: FastifyReply
  ) => {
    const investment = request.body;

    const financialItem = await this.financialItemRepository.findById(investment.financialItemId);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.type !== FinancialType.INVESTMENT) {
      return reply.status(400).send({ message: "Financial item type must be INVESTMENT" });
    }

    const json = await this.investmentRepository.create(investment);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.investmentRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { financialItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;

    const investment = await this.investmentRepository.findById(financialItemId);

    if (!investment) {
      return reply.status(404).send({ message: "Investment not found" });
    }

    return reply.status(200).send(investment);
  };

  put = async (
    request: FastifyRequest<{
      Params: { financialItemId: string },
      Body: Partial<Investment>
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;
    const data = request.body;

    const financialItem = await this.financialItemRepository.findById(financialItemId);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.type !== FinancialType.INVESTMENT) {
      return reply.status(400).send({ message: "Financial item type must be INVESTMENT" });
    }

    const investmentExists = await this.investmentRepository.findById(financialItemId);

    if (!investmentExists) {
      return reply.status(404).send({ message: "Investment not found" });
    }

    const updated = await this.investmentRepository.update(financialItemId, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { financialItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;

    const investmentExists = await this.investmentRepository.findById(financialItemId);

    if (!investmentExists) {
      return reply.status(404).send({ message: "Investment not found" });
    }

    await this.investmentRepository.delete(financialItemId);

    return reply.status(204).send();
  };
}

export const investmentController = new InvestmentController();
