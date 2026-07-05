import { FastifyInstance } from "fastify";
import { agendaItemController } from "../controllers/AgendaItemController";
import {
  agendaItemIdParamsSchema,
  agendaItemNotFoundSchema,
  agendaItemSchema,
  createAgendaItemBodySchema,
  updateAgendaItemBodySchema
} from "../schemas/agendaItem.schema";

export async function agendaItemRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ["AgendaItems"],
      summary: "Create agenda item",
      body: createAgendaItemBodySchema,
      response: {
        201: agendaItemSchema
      }
    }
  }, agendaItemController.post);

  fastify.get('/', {
    schema: {
      tags: ["AgendaItems"],
      summary: "List agenda items",
      response: {
        200: {
          type: "array",
          items: agendaItemSchema
        }
      }
    }
  }, agendaItemController.get);


  fastify.get('/:id', {
    schema: {
      tags: ["AgendaItems"],
      summary: "Get agenda item by id",
      params: agendaItemIdParamsSchema,
      response: {
        200: agendaItemSchema,
        404: agendaItemNotFoundSchema
      }
    }
  }, agendaItemController.getById);

  fastify.put('/:id', {
    schema: {
      tags: ["AgendaItems"],
      summary: "Update agenda item by id",
      params: agendaItemIdParamsSchema,
      body: updateAgendaItemBodySchema,
      response: {
        200: agendaItemSchema,
        404: agendaItemNotFoundSchema
      }
    }
  }, agendaItemController.put);

  fastify.delete('/:id', {
    schema: {
      tags: ["AgendaItems"],
      summary: "Delete agenda item by id",
      params: agendaItemIdParamsSchema,
      response: {
        404: agendaItemNotFoundSchema
      }
    }
  }, agendaItemController.delete);
}
