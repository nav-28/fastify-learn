import { FastifyPluginAsync } from "fastify";

const health: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    try {
      const [result] = await fastify.mysql.query("SELECT 1");
      return { status: "healthy", database: "connected", db: result };
    } catch (error) {
      request.log.error("Database health check failed:", error);
      return reply
        .code(500)
        .send({ status: "unhealthy", database: "disconnected" });
    }
  });
};

export default health;
