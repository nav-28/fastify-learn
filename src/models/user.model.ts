import { RowDataPacket } from "@fastify/mysql";
import { Type, Static } from "@sinclair/typebox";

export type UserRow = User & RowDataPacket;

export const userSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: "email" }),
  roles: Type.String(),
  passwordHash: Type.String(),
});

export const createUserSchema = {
  body: Type.Omit(userSchema, ["id"]),
  response: {
    201: userSchema,
    500: { error: Type.String() },
  },
};

export const updateUserSchema = {
  params: Type.Object({
    userId: Type.String(),
  }),
  body: Type.Partial(Type.Omit(userSchema, ["id"])),
  response: {
    200: userSchema,
  },
};

export const getUserSchema = {
  params: Type.Object({
    userId: Type.String(),
  }),
  response: {
    200: userSchema,
  },
};

// Types based on the schemas
export type User = Static<typeof userSchema>;
export type CreateUserBody = Static<typeof createUserSchema.body>;
export type UpdateUserBody = Static<typeof updateUserSchema.body>;
