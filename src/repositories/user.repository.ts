import { MySQLPromiseConnection } from "@fastify/mysql";
import { User, UserRow } from "../models/user.model";
import { randomUUID } from "crypto";

export class UserRepository {
  constructor(private mysql: MySQLPromiseConnection) {}

  async findById(id: string): Promise<UserRow | undefined> {
    const [users] = await this.mysql.query<UserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );

    console.log(users[0]);
    return users[0] || null;
  }

  async create(user: Omit<User, "id">) {
    const id = randomUUID();
    const newUser: User = {
      id,
      ...user,
    };

    // should this be in try catch for error handling?
    await this.mysql.query(
      "INSERT INTO users (id, name, email, roles, passwordHash) VALUES (?, ?, ?, ?, ?)",
      [
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.roles,
        newUser.passwordHash,
      ],
    );
    return newUser;
  }

  async update(id: string, updates: Partial<Omit<User, "id">>) {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return null;
    }

    const updateFields = Object.entries(updates).filter(
      ([_, value]) => value !== undefined,
    );

    if (updateFields.length > 0) {
      const query = `
          UPDATE users 
          SET ${updateFields.map(([key]) => `${key} = ?`).join(", ")}
          WHERE id = ?
        `;

      await this.mysql.query(query, [
        ...updateFields.map(([_, value]) => value),
        id,
      ]);
      return this.findById(id);
    }

    // what to do if no fields to update?
    return null;
  }
}
