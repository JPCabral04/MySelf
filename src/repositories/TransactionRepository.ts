import { Transaction } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateTransactionDTO = Omit<Transaction, 'financialItem' | 'category'>

type UpdateTransactionDTO = Partial<CreateTransactionDTO>

export class TransactionRepository {

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    return prisma.transaction.create({ data })
  }

  async findAll(): Promise<Transaction[]> {
    return prisma.transaction.findMany()
  }

  async findById(financialItemId: string): Promise<Transaction | null> {
    return prisma.transaction.findUnique({
      where: { financialItemId }
    })
  }

  async findByCategoryId(categoryId: string): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { categoryId }
    })
  }

  async update(financialItemId: string, data: UpdateTransactionDTO): Promise<Transaction> {
    return prisma.transaction.update({
      where: { financialItemId },
      data
    })
  }

  async delete(financialItemId: string): Promise<Transaction> {
    return prisma.transaction.delete({
      where: { financialItemId }
    })
  }
}
