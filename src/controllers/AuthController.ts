import { FastifyReply, FastifyRequest } from "fastify"
import { AuthRepository } from "../repositories/AuthRepository"

export class AuthController {
  private authRepository = new AuthRepository()

  register = async (
    request: FastifyRequest<{
      Body: { name: string; email: string; passwordHash: string }
    }>,
    reply: FastifyReply
  ) => {
    const { name, email, passwordHash } = request.body

    // Verificar se usuário já existe
    const userExists = await this.authRepository.findByEmail(email)
    if (userExists) {
      return reply.status(409).send({ message: "User already exists" })
    }

    // Criar novo usuário
    const user = await this.authRepository.createUser(name, email, passwordHash)

    // Gerar token JWT
    const token = request.server.jwt.sign({ id: user.id, email: user.email })

    return reply.status(201).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    })
  }

  login = async (
    request: FastifyRequest<{
      Body: { email: string; passwordHash: string }
    }>,
    reply: FastifyReply
  ) => {
    const { email, passwordHash } = request.body

    // Buscar usuário
    const user = await this.authRepository.findByEmail(email)
    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials" })
    }

    // Comparar senhas
    const passwordMatch = await this.authRepository.comparePassword(
      passwordHash,
      user.passwordHash
    )
    if (!passwordMatch) {
      return reply.status(401).send({ message: "Invalid credentials" })
    }

    // Gerar token JWT
    const token = request.server.jwt.sign({ id: user.id, email: user.email })

    return reply.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    })
  }
}

export const authController = new AuthController()
