import { User } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateUserDTO = Omit<
  User,
  'id' | 'createdAt' | 'agendaItems' | 'financialItems' | 'activities' | 'categoriesCreated'
>

type UpdateUserDTO = Partial<CreateUserDTO> // todas as propriedades opcionais

export class UserRepository {

  async create(data: CreateUserDTO): Promise<User> {
    return prisma.user.create({ data })
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    return prisma.user.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id }
    })
  }
}