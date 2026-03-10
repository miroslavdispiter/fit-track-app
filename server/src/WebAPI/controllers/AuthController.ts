import { Request, Response, Router } from 'express';
import { IAuthService } from '../../Domain/services/auth/IAuthService';
import { dataValidationAuth } from '../validators/auth/RegisterValidator';

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/auth/login', this.login.bind(this));
    this.router.post('/auth/register', this.register.bind(this));
  }

  /**
   * POST /api/auth/login
   * User Login
   */
  private async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Validation of input parameters
      const validationResult = dataValidationAuth(username, password);

      if (!validationResult.success) {
        res.status(400).json({ success: false, message: validationResult.message });
        return;
      }

      const result = await this.authService.login(username, password);

      // Checking whether the login is successful
      if (result.id !== 0) {
        res.status(200).json({success: true, message: 'Login Successful', data: result});
        return;
      } else {
        res.status(401).json({success: false, message: 'Incorrect username or password'});
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: error});
    }
  }

  /**
   * POST /api/auth/register
   * New user Registration
   */
  private async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const validationResult = dataValidationAuth(username, password);

      if (!validationResult.success) {
        res.status(400).json({ success: false, message: validationResult.message });
        return;
      }

      const result = await this.authService.register(username, password);

      // Checking whether the registration is successful
      if (result.id !== 0) {
        res.status(201).json({success: true, message: 'Register successful', data: result});
      } else {
        res.status(401).json({success: false, message: 'Registration failed. Username already exists', });
      }
    } catch (error) {
      res.status(500).json({success: false, message: error});
    }
  }

  /**
   * Getter for router
   */
  public getRouter(): Router {
    return this.router;
  }
}