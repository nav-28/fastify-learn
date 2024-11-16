import { onRequestHookHandler } from "fastify";

export interface AuthUser {
  userId: string;
  roles: string[];
}

declare module "fastify" {
  interface FastifyRequest {
    auth?: AuthUser;
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

const authMiddleware: onRequestHookHandler = (request, reply, done) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AuthError("No authorization header");
    }

    // Mock auth logic
    request.auth = {
      userId: "123",
      roles: ["admin"],
    };

    done();
  } catch (error) {
    if (error instanceof AuthError) {
      reply.code(401).send({
        error: "Unauthorized",
        message: error.message,
      });
    } else {
      reply.code(500).send({
        error: "Internal Server Error",
        message: "Authentication failed",
      });
    }
    done();
  }
};

export default authMiddleware;
