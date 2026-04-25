import { FastifyInstance } from "fastify";
import { eventController } from "../controllers/EventController";
import {
  createEventBodySchema,
  eventAgendaItemIdParamsSchema,
  eventNotFoundSchema,
  eventSchema,
  updateEventBodySchema
} from "../schemas/event.schema";

export async function eventRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createEventBodySchema,
      response: {
        201: eventSchema,
        404: eventNotFoundSchema
      }
    }
  }, eventController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: eventSchema
        }
      }
    }
  }, eventController.get);

  fastify.get('/:agendaItemId', {
    schema: {
      params: eventAgendaItemIdParamsSchema,
      response: {
        200: eventSchema,
        404: eventNotFoundSchema
      }
    }
  }, eventController.getById);

  fastify.put('/:agendaItemId', {
    schema: {
      params: eventAgendaItemIdParamsSchema,
      body: updateEventBodySchema,
      response: {
        200: eventSchema,
        404: eventNotFoundSchema
      }
    }
  }, eventController.put);

  fastify.delete('/:agendaItemId', {
    schema: {
      params: eventAgendaItemIdParamsSchema,
      response: {
        404: eventNotFoundSchema
      }
    }
  }, eventController.delete);
}
