import { FastifyInstance } from "fastify";
import { taskController } from "../controllers/TaskController";
import {
  createTaskBodySchema,
  taskAgendaItemIdParamsSchema,
  taskCategoryIdParamsSchema,
  taskNotFoundSchema,
  taskSchema,
  updateTaskBodySchema
} from "../schemas/task.schema";

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createTaskBodySchema,
      response: {
        201: taskSchema,
        404: taskNotFoundSchema
      }
    }
  }, taskController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: taskSchema
        }
      }
    }
  }, taskController.get);

  fastify.get('/category/:categoryId', {
    schema: {
      params: taskCategoryIdParamsSchema,
      response: {
        200: {
          type: "array",
          items: taskSchema
        }
      }
    }
  }, taskController.getByCategoryId);

  fastify.get('/:agendaItemId', {
    schema: {
      params: taskAgendaItemIdParamsSchema,
      response: {
        200: taskSchema,
        404: taskNotFoundSchema
      }
    }
  }, taskController.getById);

  fastify.put('/:agendaItemId', {
    schema: {
      params: taskAgendaItemIdParamsSchema,
      body: updateTaskBodySchema,
      response: {
        200: taskSchema,
        404: taskNotFoundSchema
      }
    }
  }, taskController.put);

  fastify.delete('/:agendaItemId', {
    schema: {
      params: taskAgendaItemIdParamsSchema,
      response: {
        404: taskNotFoundSchema
      }
    }
  }, taskController.delete);
}
