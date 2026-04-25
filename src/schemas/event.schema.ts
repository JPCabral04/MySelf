export const eventSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    agendaItemId: { type: "string" },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    googleEventId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  },
  required: ["agendaItemId", "startDate", "endDate"]
} as const;

export const eventAgendaItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    agendaItemId: { type: "string" }
  },
  required: ["agendaItemId"]
} as const;

export const createEventBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    agendaItemId: { type: "string", minLength: 1 },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    googleEventId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  },
  required: ["agendaItemId", "startDate", "endDate"]
} as const;

export const updateEventBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    googleEventId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  }
} as const;

export const eventNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
