import { FastifyReply, FastifyRequest } from "fastify";
import { AgendaType, Task } from "../../generated/prisma/client";
import { AgendaItemRepository } from "../repositories/AgendaItemRepository";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskController {
  private taskRepository = new TaskRepository();
  private agendaItemRepository = new AgendaItemRepository();

  post = async (
    request: FastifyRequest<{
      Body: Task
    }>,
    reply: FastifyReply
  ) => {
    const task = request.body;

    const agendaItem = await this.agendaItemRepository.findById(task.agendaItemId);

    if (!agendaItem) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    if (agendaItem.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    if (agendaItem.type !== AgendaType.TASK) {
      return reply.status(400).send({ message: "Agenda item type must be TASK" });
    }

    const json = await this.taskRepository.create(task);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const json = await this.taskRepository.findByUserId(userId);
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { agendaItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { agendaItemId } = request.params;

    const task = await this.taskRepository.findById(agendaItemId);

    if (!task) {
      return reply.status(404).send({ message: "Task not found" });
    }

    if (task.agendaItem.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    return reply.status(200).send(task);
  };

  getByCategoryId = async (
    request: FastifyRequest<{
      Params: { categoryId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { categoryId } = request.params;

    const tasks = await this.taskRepository.findByCategoryId(categoryId);

    // Filter to only return tasks that belong to the authenticated user
    const userId = request.user.id;
    const filtered = tasks.filter(t => t.agendaItem.userId === userId);

    return reply.status(200).send(filtered);
  };

  put = async (
    request: FastifyRequest<{
      Params: { agendaItemId: string },
      Body: Partial<Task>
    }>,
    reply: FastifyReply
  ) => {
    const { agendaItemId } = request.params;
    const data = request.body;

    const agendaItem = await this.agendaItemRepository.findById(agendaItemId);

    if (!agendaItem) {
      return reply.status(404).send({ message: "Agenda item not found" });
    }

    if (agendaItem.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    if (agendaItem.type !== AgendaType.TASK) {
      return reply.status(400).send({ message: "Agenda item type must be TASK" });
    }

    const taskExists = await this.taskRepository.findById(agendaItemId);

    if (!taskExists) {
      return reply.status(404).send({ message: "Task not found" });
    }

    const updated = await this.taskRepository.update(agendaItemId, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { agendaItemId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { agendaItemId } = request.params;

    const taskExists = await this.taskRepository.findById(agendaItemId);

    if (!taskExists) {
      return reply.status(404).send({ message: "Task not found" });
    }

    if (taskExists.agendaItem.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    await this.taskRepository.delete(agendaItemId);

    return reply.status(204).send();
  };
}

export const taskController = new TaskController();
