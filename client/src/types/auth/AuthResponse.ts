import type { UserLoginDto } from "../../models/auth/UserLoginDto";

/**
 * Authentification result (login/register).
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: UserLoginDto;
}