import { activityRelationSchema } from "./_shared";

export const habitModuleSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    activityId: { type: "string" },
    activity: activityRelationSchema,
    notes: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    currentStreak: { type: "integer" }
  },
  required: ["activityId", "activity", "currentStreak"]
} as const;

export const habitModuleActivityIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    activityId: { type: "string" }
  },
  required: ["activityId"]
} as const;

export const createHabitModuleBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    activityId: { type: "string", minLength: 1 },
    notes: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    currentStreak: { type: "integer" }
  },
  required: ["activityId", "currentStreak"]
} as const;

export const updateHabitModuleBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    notes: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    currentStreak: { type: "integer" }
  }
} as const;

export const habitModuleNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
