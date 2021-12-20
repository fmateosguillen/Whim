import { Router } from "express";
import { check } from "express-validator";
import { ProductController } from "../controllers/productController";
import { token } from "../services/passport";
import { msgExists, validate } from "../services/validation";

const router = Router();
router.post(
    "/new",
    [
        check("name").exists().withMessage(msgExists("name")),
        check("brand").exists().withMessage(msgExists("brand")),
        check("countryOfOrigin").exists().withMessage(msgExists("countryOfOrigin")),
        check("stock").isInt([ {lt: 1} ]).withMessage("Stock must be positive"),
        check("price").isFloat(0.0).withMessage("Price must be positive")
    ],
    validate,
    token("admin"),
    ProductController.createProduct
);
router.delete("/:id", token("admin"), ProductController.delete);
router.put("/:id", token("admin"), ProductController.edit);
router.get("", token(), ProductController.findAll);
router.get("/:id", token("admin"), ProductController.findById);

export default router;