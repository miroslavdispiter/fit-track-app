import { UserAuthDataDto } from "../../DTOs/auth/UserAuthDataDto";

export interface IAuthService {
    /**
     * Logs in the user with the given username and password.
     * @param username - Username of the user.
     * @param password - The user's password.
     * @returns User's data if the login is successful, or an empty object if not.
     */
  login(username: string, password: string): Promise<UserAuthDataDto>;

  /**
   * Registers a new user with the given username and password.
   * @param username - Username of the user.
   * @param password - The user's password.
   * @returns User's data if registration is successful, or an empty object if not.
  */
  register(username: string, password: string): Promise<UserAuthDataDto>;
}
