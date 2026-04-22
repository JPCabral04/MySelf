import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../generated/prisma/client";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  private userRepository = new UserRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<User, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const user = request.body;
    const json = await this.userRepository.create(user);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.userRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const user = await this.userRepository.findById(id);

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send(user);
  };

  getByEmail = async (
    request: FastifyRequest<{
      Params: { email: string }
    }>,
    reply: FastifyReply
  ) => {
    const { email } = request.params;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send(user);
  };

  patch = async (
    request: FastifyRequest<{
      Params: { id: string },
      Body: Partial<User>
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      return reply.status(404).send({ message: "User not found" });
    }

    const updated = await this.userRepository.update(id, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      return reply.status(404).send({ message: "User not found" });
    }

    await this.userRepository.delete(id);

    return reply.status(204).send();
  };
}