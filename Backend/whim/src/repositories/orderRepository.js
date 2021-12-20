import { Order } from "../models/order"
import { OrderLine } from "../models/orderLine";
import { orderLineRepository } from "./orderLineRepository";
import { productRepository } from "./productRepository";

const orderRepository = {
    async findCart(user) {
        const result = await Order.findOne({ordered: false, user: user._id}).populate("orderLines");
        console.log("RESULT");
        console.log(result);
        if(result != undefined){
            return result;
        } else {
            return this.createCart(user);
        }
    },

    async createCart(user) {
        const cart = new Order({
            user: user._id,
            city: user.city,
            address: user.address,
            ordered: false,
            delivered: false,  
        });
        const result = await cart.save();
        console.log(result);
        return result;
    },

    async buyCart(user) {
        let cart = await orderRepository.findCart(user);
        cart.ordered = true;
        const order = await cart.save();
        return order;
    },

    async addToCart(productId, quantity, user) {
        const product = await productRepository.findById(productId);
        const cart = await orderRepository.findCart(user);
        let productOnCart = cart.orderLines.filter((line) => line.product.equals(productId));
        if ( productOnCart==0 ) {
            const linePrice = product.price * quantity;
            const orderLine = new OrderLine({
                product: product._id,
                quantity: quantity,
                subtotal: linePrice
            });
            await linePrice.save();
            console.log(orderLine);
            cart.orderLines.push(orderLine);
        } else {
            cart.orderLines.filter((line) => line.product.equals(productId)).forEach(function(line) {
                const quantity = line.quantity +=1;
                const subtotal = line.subtotal += product.price
                const modLine = orderLineRepository.updateById(line._id, { quantity: quantity, subtotal: subtotal });
                console.log("modLine");
                console.log(modLine);
                console.log("modLine");
            });
        }

        const result = await cart.save();
        console.log(result);
        return result;
    }
};

export { orderRepository };