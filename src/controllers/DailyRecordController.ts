import { FastifyReply, FastifyRequest } from "fastify";
import { DailyRecord } from "../../generated/prisma/client";
import { DailyRecordRepository } from "../repositories/DailyRecordRepository";

export class DailyRecordController {
  private dailyRecordRepository = new DailyRecordRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<DailyRecord, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const dailyRecord = request.body;
    const json = await this.dailyRecordRepository.create(dailyRecord);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.dailyRecordRepository.findAll();
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

    return reply.status(200).send(dailyRecord);
  };

  getByHabitId = async (
    request: FastifyRequest<{
      Params: { habitId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { habitId } = request.params;

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

    await this.dailyRecordRepository.delete(id);

    return reply.status(204).send();
  };
}

export const dailyRecordController = new DailyRecordController();
