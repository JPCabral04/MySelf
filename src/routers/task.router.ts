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
      tags: ["Tasks"],
      summary: "Create task",
      body: createTaskBodySchema,
      response: {
        201: taskSchema,
        404: taskNotFoundSchema
      }
    }
  }, taskController.post);

  fastify.get('/', {
    schema: {
      tags: ["Tasks"],
      summary: "List tasks",
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
      tags: ["Tasks"],
      summary: "List tasks by category",
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
      tags: ["Tasks"],
      summary: "Get task by agenda item id",
      params: taskAgendaItemIdParamsSchema,
      response: {
        200: taskSchema,
        404: taskNotFoundSchema
      }
    }
  }, taskController.getById);

  fastify.put('/:agendaItemId', {
    schema: {
      tags: ["Tasks"],
      summary: "Update task by agenda item id",
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
      tags: ["Tasks"],
      summary: "Delete task by agenda item id",
      params: taskAgendaItemIdParamsSchema,
      response: {
        404: taskNotFoundSchema
      }
    }
  }, taskController.delete);
}
