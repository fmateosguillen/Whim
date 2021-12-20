import { Router } from "express";
import { UserController } from "../controllers/userController";
import { token } from "../services/passport";

const router = Router();
router.get('', token(), UserController.myUser);
export default router;