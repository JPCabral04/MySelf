import { FastifyReply, FastifyRequest } from "fastify"

const PUBLIC_ROUTES = ["/auth/register", "/auth/login"]

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (!request.url) {
    reply.status(400).send({ error: "Bad Request" })
    return
  }

  const url = request.url.split("?")[0] ?? request.url

  if (PUBLIC_ROUTES.includes(url) || url.startsWith("/docs")) {
    return
  }

  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ message: "Unauthorized" })
  }
}
