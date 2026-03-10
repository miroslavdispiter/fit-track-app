import { IUserRepository } from "../../../Domain/repositories/users/IUserRepository";
import { User } from "../../../Domain/models/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const query = `
        INSERT INTO users (username, password) 
        VALUES (?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.username,
        user.password,
      ]);


      if (result.insertId) {
        // Return the new user with the assigned ID
        return new User(result.insertId, user.username, user.password);
      }

      // We return an empty object if the creation is not successful
      return new User();
    } catch {
      return new User();
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const query = `
        SELECT id, username, password 
        FROM users 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.id, row.username, row.password);
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      const query = `
        SELECT id, username, password 
        FROM users 
        WHERE username = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [username]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.id, row.username, row.password);
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const query = `
        SELECT id, username, password 
        FROM users 
        ORDER BY id ASC
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new User(row.id, row.username, row.password)
      );
    } catch {
      return [];
    }
  }

  async update(user: User): Promise<User> {
    try {
      const query = `
        UPDATE users 
        SET username = ?, password = ? 
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.username,
        user.password,
        user.id,
      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM users 
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM users 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}