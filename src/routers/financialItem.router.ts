import { FastifyInstance } from "fastify";
import { financialItemController } from "../controllers/FinancialItemController";
import {
  createFinancialItemBodySchema,
  financialItemIdParamsSchema,
  financialItemNotFoundSchema,
  financialItemSchema,
  financialItemUserIdParamsSchema,
  updateFinancialItemBodySchema
} from "../schemas/financialItem.schema";

export async function financialItemRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createFinancialItemBodySchema,
      response: {
        201: financialItemSchema
      }
    }
  }, financialItemController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: financialItemSchema
        }
      }
    }
  }, financialItemController.get);

  fastify.get('/user/:userId', {
    schema: {
      params: financialItemUserIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: financialItemSchema
        }
      }
    }
  }, financialItemController.getByUserId);

  fastify.get('/:id', {
    schema: {
      params: financialItemIdParamsSchema,
      response: {
        200: financialItemSchema,
        404: financialItemNotFoundSchema
      }
    }
  }, financialItemController.getById);

  fastify.put('/:id', {
    schema: {
      params: financialItemIdParamsSchema,
      body: updateFinancialItemBodySchema,
      response: {
        200: financialItemSchema,
        404: financialItemNotFoundSchema
      }
    }
  }, financialItemController.put);

  fastify.delete('/:id', {
    schema: {
      params: financialItemIdParamsSchema,
      response: {
        404: financialItemNotFoundSchema
      }
    }
  }, financialItemController.delete);
}
