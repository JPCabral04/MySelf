import { FastifyReply, FastifyRequest } from "fastify";
import { ActivityType, HabitModule } from "../../generated/prisma/client";
import { ActivityRepository } from "../repositories/ActivityRepository";
import { HabitModuleRepository } from "../repositories/HabitModuleRepository";

export class HabitModuleController {
  private habitModuleRepository = new HabitModuleRepository();
  private activityRepository = new ActivityRepository();

  post = async (
    request: FastifyRequest<{
      Body: HabitModule
    }>,
    reply: FastifyReply
  ) => {
    const habitModule = request.body;

    const activity = await this.activityRepository.findById(habitModule.activityId);

    if (!activity) {
      return reply.status(404).send({ message: "Activity not found" });
    }

    if (activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    if (activity.type !== ActivityType.HABIT) {
      return reply.status(400).send({ message: "Activity type must be HABIT" });
    }

    const json = await this.habitModuleRepository.create(habitModule);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const json = await this.habitModuleRepository.findByUserId(userId);
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { activityId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { activityId } = request.params;

    const habitModule = await this.habitModuleRepository.findById(activityId);

    if (!habitModule) {
      return reply.status(404).send({ message: "Habit module not found" });
    }

    if (habitModule.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    return reply.status(200).send(habitModule);
  };

  put = async (
    request: FastifyRequest<{
      Params: { activityId: string },
      Body: Partial<HabitModule>
    }>,
    reply: FastifyReply
  ) => {
    const { activityId } = request.params;
    const data = request.body;

    const activity = await this.activityRepository.findById(activityId);

    if (!activity) {
      return reply.status(404).send({ message: "Activity not found" });
    }

    if (activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    if (activity.type !== ActivityType.HABIT) {
      return reply.status(400).send({ message: "Activity type must be HABIT" });
    }

    const habitModuleExists = await this.habitModuleRepository.findById(activityId);

    if (!habitModuleExists) {
      return reply.status(404).send({ message: "Habit module not found" });
    }

    const updated = await this.habitModuleRepository.update(activityId, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { activityId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { activityId } = request.params;

    const habitModuleExists = await this.habitModuleRepository.findById(activityId);

    if (!habitModuleExists) {
      return reply.status(404).send({ message: "Habit module not found" });
    }

    if (habitModuleExists.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    await this.habitModuleRepository.delete(activityId);

    return reply.status(204).send();
  };
}

export const habitModuleController = new HabitModuleController();
