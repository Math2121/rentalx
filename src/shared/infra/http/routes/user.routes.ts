import uploadConfig from "@config/upload";
import multer from "multer";
import { CreateUserController } from "@modules/accounts/UseCases/createUser/CreateUserController";
import { Router } from "express";
import { UpdateUseAvatarController } from "@modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarControllerl";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { ProfileUserController } from "@modules/accounts/UseCases/profileUserUseCase/ProfileUserController";

const userRoutes = Router();
const upladoAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updatedAvatarController = new UpdateUseAvatarController();
const profileUserController = new ProfileUserController();
userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticate,
  upladoAvatar.single("avatar"),
  updatedAvatarController.handle
);

userRoutes.get("/profile", ensureAuthenticate, profileUserController.handle);
export { userRoutes };
