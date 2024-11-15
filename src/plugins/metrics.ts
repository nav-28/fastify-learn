import fp from "fastify-plugin";
import fastifyMetrics from "fastify-metrics";

// instead of this dependecy we can setup prometheus ourselfes
// We would probably add a onRequest hook and add a start time variable there and add another onResponse hook and collect the metrics there.
export default fp(async (fastify) => {
  fastify.register(fastifyMetrics, {
    endpoint: "/metrics",
  });
});
