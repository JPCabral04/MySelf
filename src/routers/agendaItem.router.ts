import { FastifyInstance } from "fastify";
import { agendaItemController } from "../controllers/AgendaItemController";
import {
  agendaItemIdParamsSchema,
  agendaItemNotFoundSchema,
  agendaItemSchema,
  agendaItemUserIdParamsSchema,
  createAgendaItemBodySchema,
  updateAgendaItemBodySchema
} from "../schemas/agendaItem.schema";

export async function agendaItemRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createAgendaItemBodySchema,
      response: {
        201: agendaItemSchema
      }
    }
  }, agendaItemController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: agendaItemSchema
        }
      }
    }
  }, agendaItemController.get);

  fastify.get('/user/:userId', {
    schema: {
      params: agendaItemUserIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: agendaItemSchema
        }
      }
    }
  }, agendaItemController.getByUserId);

  fastify.get('/:id', {
    schema: {
      params: agendaItemIdParamsSchema,
      response: {
        200: agendaItemSchema,
        404: agendaItemNotFoundSchema
      }
    }
  }, agendaItemController.getById);

  fastify.put('/:id', {
    schema: {
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
      params: agendaItemIdParamsSchema,
      response: {
        404: agendaItemNotFoundSchema
      }
    }
  }, agendaItemController.delete);
}
