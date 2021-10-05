import { AuthenticateUserController } from "../modules/accounts/UseCases/authenticatedUser/authenticatedUserUseCase";
import { Router } from "express";


const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
