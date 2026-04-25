import { Investment } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

type CreateInvestmentDTO = Omit<Investment, 'financialItem'>

type UpdateInvestmentDTO = Partial<CreateInvestmentDTO>

export class InvestmentRepository {

  async create(data: CreateInvestmentDTO): Promise<Investment> {
    return prisma.investment.create({ data })
  }

  async findAll(): Promise<Investment[]> {
    return prisma.investment.findMany()
  }

  async findById(financialItemId: string): Promise<Investment | null> {
    return prisma.investment.findUnique({
      where: { financialItemId }
    })
  }

  async update(financialItemId: string, data: UpdateInvestmentDTO): Promise<Investment> {
    return prisma.investment.update({
      where: { financialItemId },
      data
    })
  }

  async delete(financialItemId: string): Promise<Investment> {
    return prisma.investment.delete({
      where: { financialItemId }
    })
  }
}
