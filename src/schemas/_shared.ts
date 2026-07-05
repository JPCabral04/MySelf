// ==========================================
// SCHEMAS COMPARTILHADOS DE RELAÇÕES
// Usados nos response schemas para garantir que
// as propriedades de relações incluídas pelo Prisma
// sejam preservadas na serialização do Fastify.
// ==========================================

/** Sub-schema do AgendaItem (relação) */
export const agendaItemRelationSchema = {
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

/** Sub-schema da Category (relação opcional — pode ser null) */
export const categoryRelationSchema = {
  anyOf: [
    {
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
    },
    { type: "null" }
  ]
} as const;

/** Sub-schema do FinancialItem (relação obrigatória) */
export const financialItemRelationSchema = {
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

/** Sub-schema da Activity (relação obrigatória) */
export const activityRelationSchema = {
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
