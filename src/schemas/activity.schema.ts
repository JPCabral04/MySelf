export const activitySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string" },
    type: { type: "string", enum: ["HABIT"] }
  },
  required: ["id", "name", "userId", "type"]
} as const;

export const activityIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
} as const;

export const activityUserIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: { type: "string" }
  },
  required: ["userId"]
} as const;

export const createActivityBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["HABIT"] }
  },
  required: ["name", "userId", "type"]
} as const;

export const updateActivityBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    name: { type: "string", minLength: 1 },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["HABIT"] }
  }
} as const;

export const activityNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
