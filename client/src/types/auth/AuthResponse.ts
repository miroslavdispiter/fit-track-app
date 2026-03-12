/**
 * Authentification result (login/register).
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: string;
}