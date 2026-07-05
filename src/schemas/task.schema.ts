import {
  agendaItemRelationSchema,
  categoryRelationSchema,
} from "./_shared";

export const taskSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    agendaItemId: { type: "string" },
    agendaItem: agendaItemRelationSchema,
    dueDate: {
      anyOf: [
        { type: "string", format: "date-time" },
        { type: "null" }
      ]
    },
    priority: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    isCompleted: { type: "boolean" },
    categoryId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    category: categoryRelationSchema,
  },
  required: ["agendaItemId", "agendaItem", "isCompleted"]
} as const;

export const taskAgendaItemIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    agendaItemId: { type: "string" }
  },
  required: ["agendaItemId"]
} as const;

export const taskCategoryIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    categoryId: { type: "string" }
  },
  required: ["categoryId"]
} as const;

export const createTaskBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    agendaItemId: { type: "string", minLength: 1 },
    dueDate: {
      anyOf: [
        { type: "string", format: "date-time" },
        { type: "null" }
      ]
    },
    priority: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    isCompleted: { type: "boolean" },
    categoryId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  },
  required: ["agendaItemId", "isCompleted"]
} as const;

export const updateTaskBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    dueDate: {
      anyOf: [
        { type: "string", format: "date-time" },
        { type: "null" }
      ]
    },
    priority: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    isCompleted: { type: "boolean" },
    categoryId: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  }
} as const;

export const taskNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;
