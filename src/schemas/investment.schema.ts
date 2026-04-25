export const investmentSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string" },
    assetName: { type: "string" },
    estimatedReturn: {
      anyOf: [{ type: "number" }, { type: "null" }]
    }
  },
  required: ["financialItemId", "assetName"]
} as const;

export const investmentFinancialItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string" }
  },
  required: ["financialItemId"]
} as const;

export const createInvestmentBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    financialItemId: { type: "string", minLength: 1 },
    assetName: { type: "string", minLength: 1 },
    estimatedReturn: {
      anyOf: [{ type: "number" }, { type: "null" }]
    }
  },
  required: ["financialItemId", "assetName"]
} as const;

export const updateInvestmentBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    assetName: { type: "string", minLength: 1 },
    estimatedReturn: {
      anyOf: [{ type: "number" }, { type: "null" }]
    }
  }
} as const;

export const investmentNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
