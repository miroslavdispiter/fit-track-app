import { UserAuthDataDto } from "../../Domain/DTOs/auth/UserAuthDataDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10", 10);

  public constructor(private userRepository: IUserRepository) {}

  async login(username: string, password: string): Promise<UserAuthDataDto> {
    const user = await this.userRepository.getByUsername(username);

    if (user.id !== 0 && await bcrypt.compare(password, user.password)) {
      return new UserAuthDataDto(user.id, user.username);
    }

    return new UserAuthDataDto(); // Invalid username or password
  }

  async register(username: string, password: string): Promise<UserAuthDataDto> {
    const existingUser = await this.userRepository.getByUsername(username);

    if (existingUser.id !== 0) {
      return new UserAuthDataDto(); // User already exists
    }

    // We hash the password before saving
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const newUser = await this.userRepository.create(
      new User(0, username, hashedPassword)
    );

    if (newUser.id !== 0) {
      return new UserAuthDataDto(newUser.id, newUser.username);
    }

    return new UserAuthDataDto(); // Registration failed
  }
}
