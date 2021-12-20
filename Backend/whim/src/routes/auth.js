import { Router } from "express";
import { check } from "express-validator";
import { AuthController } from "../controllers/authController";
import { password } from "../services/passport";
import { msgExists, validate } from "../services/validation";

const router = Router();

router.post(
    "/register",
    [
        check("name").exists().withMessage(msgExists("name")),
        check("lastName").exists().withMessage(msgExists("lastName")),
        check("email")
            .isEmail()
            .withMessage(msgExists("email")),
        check("password2").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(`Passwords don't match`);
            }
            return true;
        }),
        check("phoneNumber").exists().withMessage(msgExists("phoneNumber")),
        check("address").exists().withMessage(msgExists("address")),
        check("city").exists().withMessage(msgExists("city"))
    ],

    validate,
    AuthController.register
);
router.post(
    "/login",
    [check("email")
    .isEmail()
    .withMessage("This field must contain a valid email")],
    validate,
    password(),
    AuthController.login  
);

export default router;