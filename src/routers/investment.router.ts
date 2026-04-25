import { FastifyInstance } from "fastify";
import { investmentController } from "../controllers/InvestmentController";
import {
  createInvestmentBodySchema,
  investmentFinancialItemIdParamsSchema,
  investmentNotFoundSchema,
  investmentSchema,
  updateInvestmentBodySchema
} from "../schemas/investment.schema";

export async function investmentRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: createInvestmentBodySchema,
      response: {
        201: investmentSchema,
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.post);

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: "array",
          items: investmentSchema
        }
      }
    }
  }, investmentController.get);

  fastify.get('/:financialItemId', {
    schema: {
      params: investmentFinancialItemIdParamsSchema,
      response: {
        200: investmentSchema,
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.getById);

  fastify.put('/:financialItemId', {
    schema: {
      params: investmentFinancialItemIdParamsSchema,
      body: updateInvestmentBodySchema,
      response: {
        200: investmentSchema,
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.put);

  fastify.delete('/:financialItemId', {
    schema: {
      params: investmentFinancialItemIdParamsSchema,
      response: {
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.delete);
}
