import { Router } from "express";
import { check } from "express-validator";
import { CategoryController } from "../controllers/categoryController";
import { token } from "../services/passport";
import { msgExists, validate } from "../services/validation";

const router = Router();
router.post('/new',
    [
        check("name").exists().withMessage(msgExists("name"))
    ],
    validate,
    token('admin'), CategoryController.createCategory);
    router.delete('/:id', token('admin'), CategoryController.delete);
    router.put('/:id', token('admin'), CategoryController.edit);
    router.get('', token('admin'), CategoryController.findAll);


export default router;