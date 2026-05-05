import { FastifyInstance } from "fastify"
import { authController } from "../controllers/AuthController"
import {
  authErrorSchema,
  authLoginBodySchema,
  authRegisterBodySchema,
  authSuccessSchema
} from "../schemas/auth.schema"

export async function authRouter(server: FastifyInstance) {
  server.post("/register", {
    schema: {
      security: [],
      tags: ["Auth"],
      summary: "Register user",
      body: authRegisterBodySchema,
      response: {
        201: authSuccessSchema,
        409: authErrorSchema
      }
    }
  }, authController.register)

  server.post("/login", {
    schema: {
      security: [],
      tags: ["Auth"],
      summary: "Login user",
      body: authLoginBodySchema,
      response: {
        200: authSuccessSchema,
        401: authErrorSchema
      }
    }
  }, authController.login)
}
