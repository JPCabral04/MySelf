// ESM
import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './routers/user.router'
import { categoryRoutes } from './routers/category.router'
import { agendaItemRoutes } from './routers/agendaItem.router'
import { taskRoutes } from './routers/task.router'
import { eventRoutes } from './routers/event.router'
import { financialItemRoutes } from './routers/financialItem.router'
import { transactionRoutes } from './routers/transaction.router'
import { goalRoutes } from './routers/goal.router'
import { investmentRoutes } from './routers/investment.router'
import { activityRoutes } from './routers/activity.router'
import { habitModuleRoutes } from './routers/habitModule.router'
import { dailyRecordRoutes } from './routers/dailyRecord.router'
import { authRouter } from './routers/auth.router'
import { authenticateToken } from './middlewares/auth.middleware'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const fastify = Fastify({
  logger: true
})

await fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production'
})

await fastify.register(cors, {
  origin: "*",
  methods: "*",
});

await fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'MySelf API',
      description: 'API REST',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Operacoes de autenticacao' },
      { name: 'Users', description: 'Operacoes de usuarios' },
      { name: 'Categories', description: 'Operacoes de categorias' },
      { name: 'AgendaItems', description: 'Operacoes de itens da agenda' },
      { name: 'Tasks', description: 'Operacoes de tarefas' },
      { name: 'Events', description: 'Operacoes de eventos' },
      { name: 'FinancialItems', description: 'Operacoes de itens financeiros' },
      { name: 'Transactions', description: 'Operacoes de transacoes' },
      { name: 'Goals', description: 'Operacoes de metas' },
      { name: 'Investments', description: 'Operacoes de investimentos' },
      { name: 'Activities', description: 'Operacoes de atividades' },
      { name: 'HabitModules', description: 'Operacoes de modulos de habito' },
      { name: 'DailyRecords', description: 'Operacoes de registros diarios' }
    ]
  }
})

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

fastify.addHook('onRequest', authenticateToken)

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(authRouter, { prefix: '/auth' })
fastify.register(userRoutes, { prefix: '/users' })
fastify.register(categoryRoutes, { prefix: '/categories' })
fastify.register(agendaItemRoutes, { prefix: '/agenda-items' })
fastify.register(taskRoutes, { prefix: '/tasks' })
fastify.register(eventRoutes, { prefix: '/events' })
fastify.register(financialItemRoutes, { prefix: '/financial-items' })
fastify.register(transactionRoutes, { prefix: '/transactions' })
fastify.register(goalRoutes, { prefix: '/goals' })
fastify.register(investmentRoutes, { prefix: '/investments' })
fastify.register(activityRoutes, { prefix: '/activities' })
fastify.register(habitModuleRoutes, { prefix: '/habit-modules' })
fastify.register(dailyRecordRoutes, { prefix: '/daily-records' })

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