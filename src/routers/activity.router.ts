import { FastifyInstance } from "fastify";
import { activityController } from "../controllers/ActivityController";
import {
  activityIdParamsSchema,
  activityNotFoundSchema,
  activitySchema,
  createActivityBodySchema,
  updateActivityBodySchema
} from "../schemas/activity.schema";

export async function activityRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ["Activities"],
      summary: "Create activity",
      body: createActivityBodySchema,
      response: {
        201: activitySchema
      }
    }
  }, activityController.post);

  fastify.get('/', {
    schema: {
      tags: ["Activities"],
      summary: "List activities",
      response: {
        200: {
          type: "array",
          items: activitySchema
        }
      }
    }
  }, activityController.get);


  fastify.get('/:id', {
    schema: {
      tags: ["Activities"],
      summary: "Get activity by id",
      params: activityIdParamsSchema,
      response: {
        200: activitySchema,
        404: activityNotFoundSchema
      }
    }
  }, activityController.getById);

  fastify.put('/:id', {
    schema: {
      tags: ["Activities"],
      summary: "Update activity by id",
      params: activityIdParamsSchema,
      body: updateActivityBodySchema,
      response: {
        200: activitySchema,
        404: activityNotFoundSchema
      }
    }
  }, activityController.put);

  fastify.delete('/:id', {
    schema: {
      tags: ["Activities"],
      summary: "Delete activity by id",
      params: activityIdParamsSchema,
      response: {
        404: activityNotFoundSchema
      }
    }
  }, activityController.delete);
}
