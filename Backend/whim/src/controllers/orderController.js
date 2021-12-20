import { orderLineRepository } from "../repositories/orderLineRepository";
import { orderRepository } from "../repositories/orderRepository"

const OrderController = {

    addToCart: async (req, res) => {
        try {
            let orderLine = await orderRepository.addToCart(req.params.id, req.body.quantity, req.user);
            res.status(201).json(orderLine);
        } catch (error) {
            res
                .status(404)
                .json({
                    error: `There was an error in the request: ${error.msg}`
                });
        }
    },

    findCart: async (req, res) => {
        try {
            let cart = await orderRepository.findCart(req.user);
            res.status(200).json(cart);
        } catch (error) {
            res
                .status(404)
                .json({
                    error: `There was an error in the request: ${error.msg}`
                });
        }
    },

    removeProduct: async (req, res) => {
        try {
            const result = await orderLineRepository.delete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).json({
                error: `There was an error in the request: ${error.msg}`
            });
        }
    },

    buyCart: async (req, res) => {
        try {
            const result = await orderRepository.buyCart(req.user);
            res.sendStatus(200);
        } catch(error) {
            res.status(404).json({
                error: `There was an erro in the request: ${error.msg}`
            });
        }
    }
};

export { OrderController }; 