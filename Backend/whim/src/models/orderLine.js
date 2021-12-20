import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderLineSchema = new Schema({
    product: {
        type: mongoose.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    subtotal: Number
});

const OrderLine = mongoose.model('OrderLine', orderLineSchema);

export { OrderLine }