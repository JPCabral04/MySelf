import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const investmentInclude = { financialItem: true } as const

export type InvestmentWithRelations = Prisma.InvestmentGetPayload<{ include: typeof investmentInclude }>

type CreateInvestmentDTO = Omit<InvestmentWithRelations, 'financialItem'>

type UpdateInvestmentDTO = Partial<CreateInvestmentDTO>

export class InvestmentRepository {

  async create(data: CreateInvestmentDTO): Promise<InvestmentWithRelations> {
    return prisma.investment.create({ data, include: investmentInclude })
  }

  async findAll(): Promise<InvestmentWithRelations[]> {
    return prisma.investment.findMany({ include: investmentInclude })
  }

  async findById(financialItemId: string): Promise<InvestmentWithRelations | null> {
    return prisma.investment.findUnique({
      where: { financialItemId },
      include: investmentInclude
    })
  }

  async findByUserId(userId: string): Promise<InvestmentWithRelations[]> {
    return prisma.investment.findMany({
      where: { financialItem: { userId } },
      include: investmentInclude
    })
  }

  async update(financialItemId: string, data: UpdateInvestmentDTO): Promise<InvestmentWithRelations> {
    return prisma.investment.update({
      where: { financialItemId },
      data,
      include: investmentInclude
    })
  }

  async delete(financialItemId: string): Promise<InvestmentWithRelations> {
    return prisma.investment.delete({
      where: { financialItemId },
      include: investmentInclude
    })
  }
}
