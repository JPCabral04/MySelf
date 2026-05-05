export const authUserSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" }
  },
  required: ["id", "name", "email"]
} as const;

export const authRegisterBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    passwordHash: { type: "string", minLength: 1 }
  },
  required: ["name", "email", "passwordHash"]
} as const;

export const authLoginBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    passwordHash: { type: "string", minLength: 1 }
  },
  required: ["email", "passwordHash"]
} as const;

export const authSuccessSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    user: authUserSchema,
    token: { type: "string" }
  },
  required: ["user", "token"]
} as const;

export const authErrorSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;