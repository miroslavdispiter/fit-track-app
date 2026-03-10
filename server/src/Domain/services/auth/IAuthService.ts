import { UserLoginDto } from "../../DTOs/auth/UserLoginDto";

export interface IAuthService {
    /**
     * Logs in the user with the given username and password.
     * @param username - Username of the user.
     * @param password - The user's password.
     * @returns User's data if the login is successful, or an empty object if not.
     */
  login(username: string, password: string): Promise<UserLoginDto>;

  /**
   * Registers a new user with the given username and password.
   * @param username - Username of the user.
   * @param password - The user's password.
   * @returns User's data if registration is successful, or an empty object if not.
  */
  register(username: string, password: string): Promise<UserLoginDto>;
}
