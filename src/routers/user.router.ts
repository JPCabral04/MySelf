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
      tags: ["Users"],
      summary: "Create user",
      body: createUserBodySchema,
      response: {
        201: userSchema
      }
    }
  }, userController.post);

  fastify.get('/', {
    schema: {
      tags: ["Users"],
      summary: "List users",
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
      tags: ["Users"],
      summary: "Get user by email",
      params: userEmailParamsSchema,
      response: {
        200: userSchema,
        404: userNotFoundSchema
      }
    }
  }, userController.getByEmail);

  fastify.get('/:id', {
    schema: {
      tags: ["Users"],
      summary: "Get user by id",
      params: userIdParamsSchema,
      response: {
        200: userSchema,
        404: userNotFoundSchema
      }
    }
  }, userController.getById);

  fastify.put('/:id', {
    schema: {
      tags: ["Users"],
      summary: "Update user by id",
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
      tags: ["Users"],
      summary: "Delete user by id",
      params: userIdParamsSchema,
      response: {
        404: userNotFoundSchema
      }
    }
  }, userController.delete);
}