import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

const authPlugin: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.addHook("onRequest", async (request, reply) => {
    // This will be replaced with actual auth logic later
    request.auth = {
      userId: "mock-user-id",
      roles: ["user"],
    };
  });
});

export default authPlugin;
