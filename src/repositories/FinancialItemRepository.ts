import { FinancialItem } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateFinancialItemDTO = Omit<FinancialItem, 'id' | 'transaction' | 'goal' | 'investment'>

type UpdateFinancialItemDTO = Partial<CreateFinancialItemDTO>

export class FinancialItemRepository {

  async create(data: CreateFinancialItemDTO): Promise<FinancialItem> {
    return prisma.financialItem.create({ data })
  }

  async findAll(): Promise<FinancialItem[]> {
    return prisma.financialItem.findMany()
  }

  async findById(id: string): Promise<FinancialItem | null> {
    return prisma.financialItem.findUnique({
      where: { id }
    })
  }

  async findByUserId(userId: string): Promise<FinancialItem[]> {
    return prisma.financialItem.findMany({
      where: { userId }
    })
  }

  async update(id: string, data: UpdateFinancialItemDTO): Promise<FinancialItem> {
    return prisma.financialItem.update({
      where: { id },
      data
    })
  }

  async delete(id: string): Promise<FinancialItem> {
    return prisma.financialItem.delete({
      where: { id }
    })
  }
}
