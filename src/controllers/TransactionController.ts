import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialType, Transaction } from "../../generated/prisma/client";
import { FinancialItemRepository } from "../repositories/FinancialItemRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class TransactionController {
  private transactionRepository = new TransactionRepository();
  private financialItemRepository = new FinancialItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Transaction
    }>,
    reply: FastifyReply
  ) => {
    const transaction = request.body;

    const financialItem = await this.financialItemRepository.findById(transaction.financialItemId);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.type !== FinancialType.TRANSACTION) {
      return reply.status(400).send({ message: "Financial item type must be TRANSACTION" });
    }

    const json = await this.transactionRepository.create(transaction);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.transactionRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { financialItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;

    const transaction = await this.transactionRepository.findById(financialItemId);

    if (!transaction) {
      return reply.status(404).send({ message: "Transaction not found" });
    }

    return reply.status(200).send(transaction);
  };

  getByCategoryId = async (
    request: FastifyRequest<{
      Params: { categoryId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { categoryId } = request.params;

    const transactions = await this.transactionRepository.findByCategoryId(categoryId);

    return reply.status(200).send(transactions);
  };

  put = async (
    request: FastifyRequest<{
      Params: { financialItemId: string },
      Body: Partial<Transaction>
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;
    const data = request.body;

    const financialItem = await this.financialItemRepository.findById(financialItemId);

    if (!financialItem) {
      return reply.status(404).send({ message: "Financial item not found" });
    }

    if (financialItem.type !== FinancialType.TRANSACTION) {
      return reply.status(400).send({ message: "Financial item type must be TRANSACTION" });
    }

    const transactionExists = await this.transactionRepository.findById(financialItemId);

    if (!transactionExists) {
      return reply.status(404).send({ message: "Transaction not found" });
    }

    const updated = await this.transactionRepository.update(financialItemId, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { financialItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { financialItemId } = request.params;

    const transactionExists = await this.transactionRepository.findById(financialItemId);

    if (!transactionExists) {
      return reply.status(404).send({ message: "Transaction not found" });
    }

    await this.transactionRepository.delete(financialItemId);

    return reply.status(204).send();
  };
}

export const transactionController = new TransactionController();
