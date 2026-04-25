import { FastifyInstance } from "fastify";
import { habitModuleController } from "../controllers/HabitModuleController";
import {
  createHabitModuleBodySchema,
  habitModuleActivityIdParamsSchema,
  habitModuleNotFoundSchema,
  habitModuleSchema,
  updateHabitModuleBodySchema
} from "../schemas/habitModule.schema";

export async function habitModuleRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createHabitModuleBodySchema,
      response: {
        201: habitModuleSchema,
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: habitModuleSchema
        }
      }
    }
  }, habitModuleController.get);

  fastify.get('/:activityId', {
    schema: {
      params: habitModuleActivityIdParamsSchema,
      response: {
        200: habitModuleSchema,
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.getById);

  fastify.put('/:activityId', {
    schema: {
      params: habitModuleActivityIdParamsSchema,
      body: updateHabitModuleBodySchema,
      response: {
        200: habitModuleSchema,
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.put);

  fastify.delete('/:activityId', {
    schema: {
      params: habitModuleActivityIdParamsSchema,
      response: {
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.delete);
}
