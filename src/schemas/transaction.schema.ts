import {
  financialItemRelationSchema,
  categoryRelationSchema,
} from "./_shared";

export const transactionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string" },
    financialItem: financialItemRelationSchema,
    transactionType: { type: "string" },
    date: { type: "string", format: "date-time" },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    categoryId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    category: categoryRelationSchema,
  },
  required: ["financialItemId", "financialItem", "transactionType", "date"]
} as const;

export const transactionFinancialItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string" }
  },
  required: ["financialItemId"]
} as const;

export const transactionCategoryIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    categoryId: { type: "string" }
  },
  required: ["categoryId"]
} as const;

export const createTransactionBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string", minLength: 1 },
    transactionType: { type: "string", minLength: 1 },
    date: { type: "string", format: "date-time" },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    categoryId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  },
  required: ["financialItemId", "transactionType", "date"]
} as const;

export const updateTransactionBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    transactionType: { type: "string", minLength: 1 },
    date: { type: "string", format: "date-time" },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    categoryId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  }
} as const;

export const transactionNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
