import { FastifyInstance } from "fastify";
import { goalController } from "../controllers/GoalController";
import {
  createGoalBodySchema,
  goalFinancialItemIdParamsSchema,
  goalNotFoundSchema,
  goalSchema,
  updateGoalBodySchema
} from "../schemas/goal.schema";

export async function goalRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createGoalBodySchema,
      response: {
        201: goalSchema,
        404: goalNotFoundSchema
      }
    }
  }, goalController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: goalSchema
        }
      }
    }
  }, goalController.get);

  fastify.get('/:financialItemId', {
    schema: {
      params: goalFinancialItemIdParamsSchema,
      response: {
        200: goalSchema,
        404: goalNotFoundSchema
      }
    }
  }, goalController.getById);

  fastify.put('/:financialItemId', {
    schema: {
      params: goalFinancialItemIdParamsSchema,
      body: updateGoalBodySchema,
      response: {
        200: goalSchema,
        404: goalNotFoundSchema
      }
    }
  }, goalController.put);

  fastify.delete('/:financialItemId', {
    schema: {
      params: goalFinancialItemIdParamsSchema,
      response: {
        404: goalNotFoundSchema
      }
    }
  }, goalController.delete);
}
