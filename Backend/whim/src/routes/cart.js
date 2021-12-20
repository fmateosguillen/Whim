import { Router } from "express";
import { token } from "../services/passport";
import { OrderController } from "../controllers/orderController";

const router = Router();

router.get('', token(), OrderController.findCart);
router.post('/buy', token(), OrderController.buyCart);
router.post('/:id', token(), OrderController.addToCart);
router.delete('/delete/:id', token(), OrderController.removeProduct);

export default router;