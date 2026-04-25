import { FastifyInstance } from "fastify";
import { activityController } from "../controllers/ActivityController";
import {
  activityIdParamsSchema,
  activityNotFoundSchema,
  activitySchema,
  activityUserIdParamsSchema,
  createActivityBodySchema,
  updateActivityBodySchema
} from "../schemas/activity.schema";

export async function activityRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createActivityBodySchema,
      response: {
        201: activitySchema
      }
    }
  }, activityController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: activitySchema
        }
      }
    }
  }, activityController.get);

  fastify.get('/user/:userId', {
    schema: {
      params: activityUserIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: activitySchema
        }
      }
    }
  }, activityController.getByUserId);

  fastify.get('/:id', {
    schema: {
      params: activityIdParamsSchema,
      response: {
        200: activitySchema,
        404: activityNotFoundSchema
      }
    }
  }, activityController.getById);

  fastify.put('/:id', {
    schema: {
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
      params: activityIdParamsSchema,
      response: {
        404: activityNotFoundSchema
      }
    }
  }, activityController.delete);
}
