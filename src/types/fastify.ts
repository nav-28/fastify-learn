import { MySQLPromiseConnection } from "@fastify/mysql";

declare module "fastify" {
  interface FastifyRequest {
    auth?: {
      userId?: string;
      roles?: string[];
    };
  }

  interface FastifyInstance {
    mysql: MySQLPromiseConnection;
  }
}
