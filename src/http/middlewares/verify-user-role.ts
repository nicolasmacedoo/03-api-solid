import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, replu: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return replu.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
