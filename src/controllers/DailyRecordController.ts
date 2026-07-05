import { FastifyReply, FastifyRequest } from "fastify";
import { DailyRecord } from "../../generated/prisma/client";
import { DailyRecordRepository } from "../repositories/DailyRecordRepository";
import { HabitModuleRepository } from "../repositories/HabitModuleRepository";

export class DailyRecordController {
  private dailyRecordRepository = new DailyRecordRepository();
  private habitModuleRepository = new HabitModuleRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<DailyRecord, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const dailyRecord = request.body;

    // Verify that the habit belongs to the authenticated user
    const habitModule = await this.habitModuleRepository.findById(dailyRecord.habitId);

    if (!habitModule) {
      return reply.status(404).send({ message: "Habit module not found" });
    }

    if (habitModule.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    const json = await this.dailyRecordRepository.create(dailyRecord);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const json = await this.dailyRecordRepository.findByUserId(userId);
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const dailyRecord = await this.dailyRecordRepository.findById(id);

    if (!dailyRecord) {
      return reply.status(404).send({ message: "Daily record not found" });
    }

    // Check ownership via the habit → activity chain
    const habitModule = await this.habitModuleRepository.findById(dailyRecord.habitId);
    if (!habitModule || habitModule.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    return reply.status(200).send(dailyRecord);
  };

  getByHabitId = async (
    request: FastifyRequest<{
      Params: { habitId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { habitId } = request.params;

    // Verify that the habit belongs to the authenticated user
    const habitModule = await this.habitModuleRepository.findById(habitId);
    if (!habitModule || habitModule.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    const dailyRecords = await this.dailyRecordRepository.findByHabitId(habitId);

    return reply.status(200).send(dailyRecords);
  };

  put = async (
    request: FastifyRequest<{
      Params: { id: string },
      Body: Partial<DailyRecord>
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const dailyRecordExists = await this.dailyRecordRepository.findById(id);

    if (!dailyRecordExists) {
      return reply.status(404).send({ message: "Daily record not found" });
    }

    const habitModule = await this.habitModuleRepository.findById(dailyRecordExists.habitId);
    if (!habitModule || habitModule.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    const updated = await this.dailyRecordRepository.update(id, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const dailyRecordExists = await this.dailyRecordRepository.findById(id);

    if (!dailyRecordExists) {
      return reply.status(404).send({ message: "Daily record not found" });
    }

    const habitModule = await this.habitModuleRepository.findById(dailyRecordExists.habitId);
    if (!habitModule || habitModule.activity.userId !== request.user.id) {
      return reply.status(403).send({ message: "Forbidden" });
    }

    await this.dailyRecordRepository.delete(id);

    return reply.status(204).send();
  };
}

export const dailyRecordController = new DailyRecordController();
