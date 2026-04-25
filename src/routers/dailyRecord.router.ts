import { FastifyInstance } from "fastify";
import { dailyRecordController } from "../controllers/DailyRecordController";
import {
  createDailyRecordBodySchema,
  dailyRecordHabitIdParamsSchema,
  dailyRecordIdParamsSchema,
  dailyRecordNotFoundSchema,
  dailyRecordSchema,
  updateDailyRecordBodySchema
} from "../schemas/dailyRecord.schema";

export async function dailyRecordRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createDailyRecordBodySchema,
      response: {
        201: dailyRecordSchema
      }
    }
  }, dailyRecordController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: dailyRecordSchema
        }
      }
    }
  }, dailyRecordController.get);

  fastify.get('/habit/:habitId', {
    schema: {
      params: dailyRecordHabitIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: dailyRecordSchema
        }
      }
    }
  }, dailyRecordController.getByHabitId);

  fastify.get('/:id', {
    schema: {
      params: dailyRecordIdParamsSchema,
      response: {
        200: dailyRecordSchema,
        404: dailyRecordNotFoundSchema
      }
    }
  }, dailyRecordController.getById);

  fastify.put('/:id', {
    schema: {
      params: dailyRecordIdParamsSchema,
      body: updateDailyRecordBodySchema,
      response: {
        200: dailyRecordSchema,
        404: dailyRecordNotFoundSchema
      }
    }
  }, dailyRecordController.put);

  fastify.delete('/:id', {
    schema: {
      params: dailyRecordIdParamsSchema,
      response: {
        404: dailyRecordNotFoundSchema
      }
    }
  }, dailyRecordController.delete);
}
