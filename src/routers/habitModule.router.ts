import { FastifyInstance } from "fastify";
import { habitModuleController } from "../controllers/HabitModuleController";

export async function habitModuleRoutes(fastify: FastifyInstance) {
  fastify.post('/', habitModuleController.post);
  fastify.get('/', habitModuleController.get);
  fastify.get('/:activityId', habitModuleController.getById);
  fastify.put('/:activityId', habitModuleController.put);
  fastify.delete('/:activityId', habitModuleController.delete);
}
