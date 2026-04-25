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
      tags: ["Investments"],
      summary: "Create investment",
      body: createInvestmentBodySchema,
      response: {
        201: investmentSchema,
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.post);

  fastify.get('/', {
    schema: {
      tags: ["Investments"],
      summary: "List investments",
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
      tags: ["Investments"],
      summary: "Get investment by financial item id",
      params: investmentFinancialItemIdParamsSchema,
      response: {
        200: investmentSchema,
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.getById);

  fastify.put('/:financialItemId', {
    schema: {
      tags: ["Investments"],
      summary: "Update investment by financial item id",
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
      tags: ["Investments"],
      summary: "Delete investment by financial item id",
      params: investmentFinancialItemIdParamsSchema,
      response: {
        404: investmentNotFoundSchema
      }
    }
  }, investmentController.delete);
}
