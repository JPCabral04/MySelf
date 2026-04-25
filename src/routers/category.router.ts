import { FastifyInstance } from "fastify";
import { categoryController } from "../controllers/CategoryController";
import {
  categoryIdParamsSchema,
  categoryNotFoundSchema,
  categorySchema,
  categoryUserIdParamsSchema,
  createCategoryBodySchema,
  updateCategoryBodySchema
} from "../schemas/category.schema";

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ["Categories"],
      summary: "Create category",
      body: createCategoryBodySchema,
      response: {
        201: categorySchema
      }
    }
  }, categoryController.post);

  fastify.get('/', {
    schema: {
      tags: ["Categories"],
      summary: "List categories",
      response: {
        200: {
          type: "array",
          items: categorySchema
        }
      }
    }
  }, categoryController.get);

  fastify.get('/user/:userId', {
    schema: {
      tags: ["Categories"],
      summary: "List categories by user",
      params: categoryUserIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: categorySchema
        }
      }
    }
  }, categoryController.getByUserId);

  fastify.get('/:id', {
    schema: {
      tags: ["Categories"],
      summary: "Get category by id",
      params: categoryIdParamsSchema,
      response: {
        200: categorySchema,
        404: categoryNotFoundSchema
      }
    }
  }, categoryController.getById);

  fastify.put('/:id', {
    schema: {
      tags: ["Categories"],
      summary: "Update category by id",
      params: categoryIdParamsSchema,
      body: updateCategoryBodySchema,
      response: {
        200: categorySchema,
        404: categoryNotFoundSchema
      }
    }
  }, categoryController.put);

  fastify.delete('/:id', {
    schema: {
      tags: ["Categories"],
      summary: "Delete category by id",
      params: categoryIdParamsSchema,
      response: {
        404: categoryNotFoundSchema
      }
    }
  }, categoryController.delete);
}