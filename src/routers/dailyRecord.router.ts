import { FastifyInstance } from "fastify";
import { dailyRecordController } from "../controllers/DailyRecordController";

export async function dailyRecordRoutes(fastify: FastifyInstance) {
  fastify.post('/', dailyRecordController.post);
  fastify.get('/', dailyRecordController.get);
  fastify.get('/habit/:habitId', dailyRecordController.getByHabitId);
  fastify.get('/:id', dailyRecordController.getById);
  fastify.put('/:id', dailyRecordController.put);
  fastify.delete('/:id', dailyRecordController.delete);
}
