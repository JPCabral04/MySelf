import { FastifyInstance } from "fastify"
import { authController } from "../controllers/AuthController"

export async function authRouter(server: FastifyInstance) {
  server.post("/auth/register", authController.register)
  server.post("/auth/login", authController.login)
}
