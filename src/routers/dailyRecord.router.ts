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
      tags: ["DailyRecords"],
      summary: "Create daily record",
      body: createDailyRecordBodySchema,
      response: {
        201: dailyRecordSchema
      }
    }
  }, dailyRecordController.post);

  fastify.get('/', {
    schema: {
      tags: ["DailyRecords"],
      summary: "List daily records",
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
      tags: ["DailyRecords"],
      summary: "List daily records by habit",
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
      tags: ["DailyRecords"],
      summary: "Get daily record by id",
      params: dailyRecordIdParamsSchema,
      response: {
        200: dailyRecordSchema,
        404: dailyRecordNotFoundSchema
      }
    }
  }, dailyRecordController.getById);

  fastify.put('/:id', {
    schema: {
      tags: ["DailyRecords"],
      summary: "Update daily record by id",
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
      tags: ["DailyRecords"],
      summary: "Delete daily record by id",
      params: dailyRecordIdParamsSchema,
      response: {
        404: dailyRecordNotFoundSchema
      }
    }
  }, dailyRecordController.delete);
}
