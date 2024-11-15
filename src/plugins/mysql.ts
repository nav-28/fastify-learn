import fp from "fastify-plugin";
import fastifyMysql from "@fastify/mysql";
import config from "../config";

export default fp(async (fastify) => {
  fastify.register(fastifyMysql, {
    ...config.mysql,
    promise: true,
  });
});
