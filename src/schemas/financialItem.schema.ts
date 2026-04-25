export const financialItemSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    amount: { type: "number" },
    userId: { type: "string" },
    type: { type: "string", enum: ["TRANSACTION", "GOAL", "INVESTMENT"] }
  },
  required: ["id", "amount", "userId", "type"]
} as const;

export const financialItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
} as const;

export const financialItemUserIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: { type: "string" }
  },
  required: ["userId"]
} as const;

export const createFinancialItemBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    amount: { type: "number" },
    userId: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["TRANSACTION", "GOAL", "INVESTMENT"] }
  },
  required: ["amount", "userId", "type"]
} as const;

export const updateFinancialItemBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    amount: { type: "number" },
    userId: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["TRANSACTION", "GOAL", "INVESTMENT"] }
  }
} as const;

export const financialItemNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
