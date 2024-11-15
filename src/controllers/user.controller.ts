import { MySQLPromiseConnection } from "@fastify/mysql";
import { UserRepository } from "../repositories/user.repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, UpdateUserBody } from "../models/user.model";

export class UserController {
  private userRepository: UserRepository;

  constructor(mysql: MySQLPromiseConnection) {
    this.userRepository = new UserRepository(mysql);
  }

  async getUser(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply,
  ) {
    console.log("auth");
    console.log(request.auth);
    try {
      const user = await this.userRepository.findById(request.params.userId);
      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }
      return reply.send(user);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: "Failed to fetch user" });
    }
  }

  async updateUser(
    request: FastifyRequest<{
      Params: { userId: string };
      Body: UpdateUserBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      const user = await this.userRepository.update(
        request.params.userId,
        request.body,
      );
      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }
      return reply.send(user);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: "Failed to update user" });
    }
  }

  async createUser(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply,
  ) {
    try {
      const newUser = await this.userRepository.create(request.body);
      return reply.code(201).send(newUser);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: "Failed to create user" });
    }
  }
}
