import fp from "fastify-plugin";
import fastifyMysql, { MySQLPromiseConnection } from "@fastify/mysql";
import config from "../config";

declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromiseConnection;
  }
}

export default fp(async (fastify) => {
  fastify.register(fastifyMysql, {
    ...config.mysql,
    promise: true,
  });
});
