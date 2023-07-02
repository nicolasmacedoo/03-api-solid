import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, replu: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return replu.status(401).send({ message: 'Unauthorized.' })
  }
}
