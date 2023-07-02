import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'

import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'
import { prisma } from '@/lib/prisma'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)

  app.get(
    '/academias',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const academias = await prisma.gym.findMany()

      return reply.status(200).send(academias)
    },
  )
}
