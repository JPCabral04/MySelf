export const categorySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    hexColor: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    moduleType: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string" }
  },
  required: ["id", "name", "userId"]
} as const;

export const categoryIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
} as const;

export const categoryUserIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: { type: "string" }
  },
  required: ["userId"]
} as const;

export const createCategoryBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    hexColor: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    moduleType: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string", minLength: 1 }
  },
  required: ["name", "userId"]
} as const;

export const updateCategoryBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    name: { type: "string", minLength: 1 },
    hexColor: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    moduleType: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string", minLength: 1 }
  }
} as const;

export const categoryNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
