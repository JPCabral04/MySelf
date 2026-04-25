import { FastifyInstance } from "fastify";
import { userController } from "../controllers/UserController";
import {
  createUserBodySchema,
  updateUserBodySchema,
  userEmailParamsSchema,
  userIdParamsSchema,
  userNotFoundSchema,
  userSchema
} from "../schemas/user.schema";


export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createUserBodySchema,
      response: {
        201: userSchema
      }
    }
  }, userController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: userSchema
        }
      }
    }
  }, userController.get);

  fastify.get('/email/:email', {
    schema: {
      params: userEmailParamsSchema,
      response: {
        200: userSchema,
        404: userNotFoundSchema
      }
    }
  }, userController.getByEmail);

  fastify.get('/:id', {
    schema: {
      params: userIdParamsSchema,
      response: {
        200: userSchema,
        404: userNotFoundSchema
      }
    }
  }, userController.getById);

  fastify.put('/:id', {
    schema: {
      params: userIdParamsSchema,
      body: updateUserBodySchema,
      response: {
        200: userSchema,
        404: userNotFoundSchema
      }
    }
  }, userController.put);

  fastify.delete('/:id', {
    schema: {
      params: userIdParamsSchema,
      response: {
        404: userNotFoundSchema
      }
    }
  }, userController.delete);
}