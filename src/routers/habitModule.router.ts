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
      tags: ["HabitModules"],
      summary: "Create habit module",
      body: createHabitModuleBodySchema,
      response: {
        201: habitModuleSchema,
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.post);

  fastify.get('/', {
    schema: {
      tags: ["HabitModules"],
      summary: "List habit modules",
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
      tags: ["HabitModules"],
      summary: "Get habit module by activity id",
      params: habitModuleActivityIdParamsSchema,
      response: {
        200: habitModuleSchema,
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.getById);

  fastify.put('/:activityId', {
    schema: {
      tags: ["HabitModules"],
      summary: "Update habit module by activity id",
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
      tags: ["HabitModules"],
      summary: "Delete habit module by activity id",
      params: habitModuleActivityIdParamsSchema,
      response: {
        404: habitModuleNotFoundSchema
      }
    }
  }, habitModuleController.delete);
}
