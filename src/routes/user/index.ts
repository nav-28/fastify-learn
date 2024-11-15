import { FastifyPluginAsync } from "fastify";
import { UserController } from "../../controllers/user.controller";
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../../models/user.model";

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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