export const agendaItemSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string" },
    type: { type: "string", enum: ["TASK", "EVENT"] }
  },
  required: ["id", "title", "userId", "type"]
} as const;

export const agendaItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
} as const;

export const agendaItemUserIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    userId: { type: "string" }
  },
  required: ["userId"]
} as const;

export const createAgendaItemBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string", minLength: 1 },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["TASK", "EVENT"] }
  },
  required: ["title", "userId", "type"]
} as const;

export const updateAgendaItemBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    title: { type: "string", minLength: 1 },
    description: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    userId: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["TASK", "EVENT"] }
  }
} as const;

export const agendaItemNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
