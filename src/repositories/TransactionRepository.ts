import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const transactionInclude = { financialItem: true, category: true } as const

export type TransactionWithRelations = Prisma.TransactionGetPayload<{ include: typeof transactionInclude }>

type CreateTransactionDTO = Omit<TransactionWithRelations, 'financialItem' | 'category'>

type UpdateTransactionDTO = Partial<CreateTransactionDTO>

export class TransactionRepository {

  async create(data: CreateTransactionDTO): Promise<TransactionWithRelations> {
    return prisma.transaction.create({ data, include: transactionInclude })
  }

  async findAll(): Promise<TransactionWithRelations[]> {
    return prisma.transaction.findMany({ include: transactionInclude })
  }

  async findById(financialItemId: string): Promise<TransactionWithRelations | null> {
    return prisma.transaction.findUnique({
      where: { financialItemId },
      include: transactionInclude
    })
  }

  async findByCategoryId(categoryId: string): Promise<TransactionWithRelations[]> {
    return prisma.transaction.findMany({
      where: { categoryId },
      include: transactionInclude
    })
  }

  async findByUserId(userId: string): Promise<TransactionWithRelations[]> {
    return prisma.transaction.findMany({
      where: { financialItem: { userId } },
      include: transactionInclude
    })
  }

  async update(financialItemId: string, data: UpdateTransactionDTO): Promise<TransactionWithRelations> {
    return prisma.transaction.update({
      where: { financialItemId },
      data,
      include: transactionInclude
    })
  }

  async delete(financialItemId: string): Promise<TransactionWithRelations> {
    return prisma.transaction.delete({
      where: { financialItemId },
      include: transactionInclude
    })
  }
}
