import { FastifyPluginAsync } from "fastify";
import { UserController } from "../../controllers/user.controller";
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../../models/user.model";
import authMiddleware from "../../middleware/auth";

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // authMiddleware should run onRequest instead of preHandler since body has not been parsed in onRequest
  // and we need to check the authorization header before parsing the body
  // Running it on preHandler will cause the body to be parsed before the authMiddleware runs and its a secruity risk
  fastify.addHook("onRequest", authMiddleware);
  const userController = new UserController(fastify.mysql);

  fastify.put("/", {
    schema: createUserSchema,
    handler: userController.createUser.bind(userController),
  });

  fastify.post("/:userId", {
    schema: updateUserSchema,
    handler: userController.updateUser.bind(userController),
  });

  fastify.get("/:userId", {
    schema: getUserSchema,
    handler: userController.getUser.bind(userController),
  });
};

export default userRoutes;
