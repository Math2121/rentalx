
import { AuthenticateUserController } from "@modules/accounts/UseCases/authenticatedUser/authenticatedUserController";
import { RefreshTokenController } from "@modules/accounts/UseCases/refreshToken/RefreshTokenController";
import { Router } from "express";


const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
