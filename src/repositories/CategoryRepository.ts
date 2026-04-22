import { Category } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateCategoryDTO = Omit<
  Category,
  'id' | 'user' | 'tasks' | 'transactions'
>

type UpdateCategoryDTO = Partial<CreateCategoryDTO>

export class CategoryRepository {

  async create(data: CreateCategoryDTO): Promise<Category> {
    return prisma.category.create({ data })
  }

  async findAll(): Promise<Category[]> {
    return prisma.category.findMany()
  }

  async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id }
    })
  }

  async findByUserId(userId: string): Promise<Category[]> {
    return prisma.category.findMany({
      where: { userId }
    })
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id }
    })
  }
}