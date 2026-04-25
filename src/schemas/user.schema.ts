export const userSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    passwordHash: { type: "string" },
    profilePicture: {
      anyOf: [{ type: "string" }, { type: "null" }]
    },
    createdAt: { type: "string", format: "date-time" }
  },
  required: ["id", "name", "email", "passwordHash", "createdAt"]
} as const;

export const userIdParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
} as const;

export const userEmailParamsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" }
  },
  required: ["email"]
} as const;

export const createUserBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    passwordHash: { type: "string", minLength: 1 },
    profilePicture: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  },
  required: ["name", "email", "passwordHash"]
} as const;

export const updateUserBodySchema = {
  type: "object",
  additionalProperties: false,
  minProperties: 1,
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    passwordHash: { type: "string", minLength: 1 },
    profilePicture: {
      anyOf: [{ type: "string" }, { type: "null" }]
    }
  }
} as const;

export const userNotFoundSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;