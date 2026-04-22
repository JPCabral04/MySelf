// ESM
import Fastify from 'fastify'
import { userRoutes } from './routers/user.router'
import { categoryRoutes } from './routers/category.router'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(userRoutes, { prefix: '/users' })
fastify.register(categoryRoutes, { prefix: '/categories' })

/**
 * Run the server!
 */
const start = async () => {
  try {
    const address = await fastify.listen({
      port: 3000,
      host: '0.0.0.0'
    })

    console.log(`Servidor rodando em ${address}`)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()