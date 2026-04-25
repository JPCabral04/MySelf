export const goalSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string" },
    title: { type: "string" },
    targetAmount: { type: "number" },
    targetDate: {
      anyOf: [
        { type: "string", format: "date-time" },
        { type: "null" }
      ]
    }
  },
  required: ["financialItemId", "title", "targetAmount"]
} as const;

export const goalFinancialItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string" }
  },
  required: ["financialItemId"]
} as const;

export const createGoalBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string", minLength: 1 },
    title: { type: "string", minLength: 1 },
    targetAmount: { type: "number" },
    targetDate: {
      anyOf: [
        { type: "string", format: "date-time" },
        { type: "null" }
      ]
    }
  },
  required: ["financialItemId", "title", "targetAmount"]
} as const;

export const updateGoalBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    title: { type: "string", minLength: 1 },
    targetAmount: { type: "number" },
    targetDate: {
      anyOf: [
        { type: "string", format: "date-time" },
        { type: "null" }
      ]
    }
  }
} as const;

export const goalNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
