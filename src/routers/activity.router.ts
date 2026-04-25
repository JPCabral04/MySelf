import { FastifyInstance } from "fastify";
import { activityController } from "../controllers/ActivityController";

export async function activityRoutes(fastify: FastifyInstance) {
  fastify.post('/', activityController.post);
  fastify.get('/', activityController.get);
  fastify.get('/user/:userId', activityController.getByUserId);
  fastify.get('/:id', activityController.getById);
  fastify.put('/:id', activityController.put);
  fastify.delete('/:id', activityController.delete);
}
