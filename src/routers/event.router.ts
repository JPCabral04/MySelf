import { FastifyInstance } from "fastify";
import { eventController } from "../controllers/EventController";

export async function eventRoutes(fastify: FastifyInstance) {
  fastify.post('/', eventController.post);
  fastify.get('/', eventController.get);
  fastify.get('/:agendaItemId', eventController.getById);
  fastify.put('/:agendaItemId', eventController.put);
  fastify.delete('/:agendaItemId', eventController.delete);
}
