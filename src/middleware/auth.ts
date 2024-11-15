import { preHandlerHookHandler } from "fastify";

export interface AuthUser {
  userId: string;
  roles: string[];
}

declare module "fastify" {
  interface FastifyRequest {
    auth?: AuthUser;
  }
}

const authMiddleware: preHandlerHookHandler = (request, _, done) => {
  request.auth = { userId: "123", roles: ["admin"] };
  done();
};

export default authMiddleware;
