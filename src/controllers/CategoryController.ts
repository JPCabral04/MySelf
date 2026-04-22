import { FastifyReply, FastifyRequest } from "fastify";
import { Category } from "../../generated/prisma/client";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryController {
  private categoryRepository = new CategoryRepository();

  post = async (
    request: FastifyRequest<{
      Body: Omit<Category, 'id'>
    }>,
    reply: FastifyReply
  ) => {
    const category = request.body;
    const json = await this.categoryRepository.create(category);
    return reply.status(201).send(json);
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const json = await this.categoryRepository.findAll();
    return reply.status(200).send(json);
  };

  getById = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      return reply.status(404).send({ message: "Category not found" });
    }

    return reply.status(200).send(category);
  };

  getByUserId = async (
    request: FastifyRequest<{
      Params: { userId: string }
    }>,
    reply: FastifyReply
  ) => {
    const { userId } = request.params;

    const categories = await this.categoryRepository.findByUserId(userId);

    return reply.status(200).send(categories);
  };

  put = async (
    request: FastifyRequest<{
      Params: { id: string },
      Body: Partial<Category>
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const data = request.body;

    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) {
      return reply.status(404).send({ message: "Category not found" });
    }

    const updated = await this.categoryRepository.update(id, data);

    return reply.status(200).send(updated);
  };

  delete = async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) {
      return reply.status(404).send({ message: "Category not found" });
    }

    await this.categoryRepository.delete(id);

    return reply.status(204).send();
  };
}

export const categoryController = new CategoryController();