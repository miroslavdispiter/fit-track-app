import { User } from "../../models/User";

/**
 * Repository interface for user management
 * Defines operations for working with users in the database
 */
export interface IUserRepository {
  /**
   * Creates a new user in the database
   * @param user - The user object to create
   * @returns Promise that returns the created user with the assigned id or an empty object
   */
  create(user: User): Promise<User>;

  /**
   * Finds user by ID
   * @param id - The user's unique identifier
   * @returns Returns the user or an empty object if not found
   */
  getById(id: number): Promise<User>;

  /**
   * Finds a user by username
   * @param username - Username to search
   * @returns Promise that returns the user or an empty object if not found
   */
  getByUsername(username: string): Promise<User>;

  /**
   * Returns all users from the database
   * @returns Promise that returns an array of all users
   */
  getAll(): Promise<User[]>;

  /**
   * Updates an existing user
   * @param user - User object with updated data
   * @returns Promise that returns the updated user or an empty object if the update was not successful
   */
  update(user: User): Promise<User>;

  /**
   * Deletes the user from the database
   * @param id - ID of the user to delete
   * @returns Promise that returns true if the deletion is successful, false otherwise
   */
  delete(id: number): Promise<boolean>;

  /**
   * Checks if the user exists in the database
   * @param id - ID of the user to check
   * @returns Promise that returns true if the user exists, false otherwise
   */
  exists(id: number): Promise<boolean>;
}