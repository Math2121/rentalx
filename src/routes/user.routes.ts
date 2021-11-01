import uploadConfig from '../config/upload'
import multer from "multer";
import { CreateUserController } from "../modules/accounts/UseCases/createUser/CreateUserController";
import { Router } from "express";
import { UpdateUseAvatarController } from "../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarControllerl";
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';



const userRoutes = Router();
const upladoAvatar = multer(uploadConfig.upload("./tmp/avatar"))
const createUserController = new CreateUserController();
const updatedAvatarController = new UpdateUseAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch("/avatar",ensureAuthenticate,upladoAvatar.single("avatar"), updatedAvatarController.handle);
export { userRoutes };
