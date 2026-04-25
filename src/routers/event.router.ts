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
      tags: ["Events"],
      summary: "Create event",
      body: createEventBodySchema,
      response: {
        201: eventSchema,
        404: eventNotFoundSchema
      }
    }
  }, eventController.post);

  fastify.get('/', {
    schema: {
      tags: ["Events"],
      summary: "List events",
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
      tags: ["Events"],
      summary: "Get event by agenda item id",
      params: eventAgendaItemIdParamsSchema,
      response: {
        200: eventSchema,
        404: eventNotFoundSchema
      }
    }
  }, eventController.getById);

  fastify.put('/:agendaItemId', {
    schema: {
      tags: ["Events"],
      summary: "Update event by agenda item id",
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
      tags: ["Events"],
      summary: "Delete event by agenda item id",
      params: eventAgendaItemIdParamsSchema,
      response: {
        404: eventNotFoundSchema
      }
    }
  }, eventController.delete);
}
