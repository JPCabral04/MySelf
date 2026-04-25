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
      tags: ["FinancialItems"],
      summary: "Create financial item",
      body: createFinancialItemBodySchema,
      response: {
        201: financialItemSchema
      }
    }
  }, financialItemController.post);

  fastify.get('/', {
    schema: {
      tags: ["FinancialItems"],
      summary: "List financial items",
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
      tags: ["FinancialItems"],
      summary: "List financial items by user",
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
      tags: ["FinancialItems"],
      summary: "Get financial item by id",
      params: financialItemIdParamsSchema,
      response: {
        200: financialItemSchema,
        404: financialItemNotFoundSchema
      }
    }
  }, financialItemController.getById);

  fastify.put('/:id', {
    schema: {
      tags: ["FinancialItems"],
      summary: "Update financial item by id",
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
      tags: ["FinancialItems"],
      summary: "Delete financial item by id",
      params: financialItemIdParamsSchema,
      response: {
        404: financialItemNotFoundSchema
      }
    }
  }, financialItemController.delete);
}
