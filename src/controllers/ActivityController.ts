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
    const { userId: _ignored, ...rest } = request.body as Activity;
    const userId = request.user.id;
    const json = await this.activityRepository.create({ ...rest, userId });
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const json = await this.activityRepository.findByUserId(userId);
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

    if (activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    return reply.status(200).send(activity);
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

    if (activityExists.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
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

    if (activityExists.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    await this.activityRepository.delete(id);

    return reply.status(204).send();
  };
}

export const activityController = new ActivityController();
