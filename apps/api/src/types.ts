declare module 'fastify' {
  interface FastifyRequest {
    user?: UserAuth
  }
}

export interface UserAuth {
  id: string
  name: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
  exp: number
  iat: number
}
