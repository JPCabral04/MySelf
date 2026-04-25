import { FastifyInstance } from "fastify";
import { transactionController } from "../controllers/TransactionController";
import {
  createTransactionBodySchema,
  transactionCategoryIdParamsSchema,
  transactionFinancialItemIdParamsSchema,
  transactionNotFoundSchema,
  transactionSchema,
  updateTransactionBodySchema
} from "../schemas/transaction.schema";

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ["Transactions"],
      summary: "Create transaction",
      body: createTransactionBodySchema,
      response: {
        201: transactionSchema,
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.post);

  fastify.get('/', {
    schema: {
      tags: ["Transactions"],
      summary: "List transactions",
      response: {
        200: {
          type: "array",
          items: transactionSchema
        }
      }
    }
  }, transactionController.get);

  fastify.get('/category/:categoryId', {
    schema: {
      tags: ["Transactions"],
      summary: "List transactions by category",
      params: transactionCategoryIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: transactionSchema
        }
      }
    }
  }, transactionController.getByCategoryId);

  fastify.get('/:financialItemId', {
    schema: {
      tags: ["Transactions"],
      summary: "Get transaction by financial item id",
      params: transactionFinancialItemIdParamsSchema,
      response: {
        200: transactionSchema,
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.getById);

  fastify.put('/:financialItemId', {
    schema: {
      tags: ["Transactions"],
      summary: "Update transaction by financial item id",
      params: transactionFinancialItemIdParamsSchema,
      body: updateTransactionBodySchema,
      response: {
        200: transactionSchema,
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.put);

  fastify.delete('/:financialItemId', {
    schema: {
      tags: ["Transactions"],
      summary: "Delete transaction by financial item id",
      params: transactionFinancialItemIdParamsSchema,
      response: {
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.delete);
}
