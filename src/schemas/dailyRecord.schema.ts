export const dailyRecordSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    date: { type: "string", format: "date-time" },
    isCompleted: {
      anyOf: [{ type: "boolean" }, { type: "null" }]
    },
    habitId: { type: "string" }
  },
  required: ["id", "date", "habitId"]
} as const;

export const dailyRecordIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
} as const;

export const dailyRecordHabitIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    habitId: { type: "string" }
  },
  required: ["habitId"]
} as const;

export const createDailyRecordBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    date: { type: "string", format: "date-time" },
    isCompleted: {
      anyOf: [{ type: "boolean" }, { type: "null" }]
    },
    habitId: { type: "string", minLength: 1 }
  },
  required: ["date", "habitId"]
} as const;

export const updateDailyRecordBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    date: { type: "string", format: "date-time" },
    isCompleted: {
      anyOf: [{ type: "boolean" }, { type: "null" }]
    },
    habitId: { type: "string", minLength: 1 }
  }
} as const;

export const dailyRecordNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
