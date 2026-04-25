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
      body: createTransactionBodySchema,
      response: {
        201: transactionSchema,
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.post);

  fastify.get('/', {
    schema: {
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
      params: transactionFinancialItemIdParamsSchema,
      response: {
        200: transactionSchema,
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.getById);

  fastify.put('/:financialItemId', {
    schema: {
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
      params: transactionFinancialItemIdParamsSchema,
      response: {
        404: transactionNotFoundSchema
      }
    }
  }, transactionController.delete);
}
