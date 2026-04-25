import { FastifyReply, FastifyRequest } from "fastify";
import { Activity } from "../../generated/prisma/client";
import { ActivityRepository } from "../repositories/ActivityRepository";

export class ActivityController {
  private activityRepository = new ActivityRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<Activity, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const activity = request.body;
    const json = await this.activityRepository.create(activity);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.activityRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const activity = await this.activityRepository.findById(id);

    if (!activity) {
      return reply.status(404).send({ message: "Activity not found" });
    }

    return reply.status(200).send(activity);
  };

  getByUserId = async (
    request: FastifyRequest<{
      Params: { userId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { userId } = request.params;

    const activities = await this.activityRepository.findByUserId(userId);

    return reply.status(200).send(activities);
  };

  put = async (
    request: FastifyRequest<{
      Params: { id: string },
      Body: Partial<Activity>
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const activityExists = await this.activityRepository.findById(id);

    if (!activityExists) {
      return reply.status(404).send({ message: "Activity not found" });
    }

    const updated = await this.activityRepository.update(id, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const activityExists = await this.activityRepository.findById(id);

    if (!activityExists) {
      return reply.status(404).send({ message: "Activity not found" });
    }

    await this.activityRepository.delete(id);

    return reply.status(204).send();
  };
}

export const activityController = new ActivityController();
