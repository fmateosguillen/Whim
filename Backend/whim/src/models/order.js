import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    sent: Boolean,
    delivered: Boolean,
    orderDate: Date,
    deliverDate: Date,
    total: Number,
    city: String,
    address: String,
    ordered: Boolean,
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },

    orderLines: [{
        type: mongoose.ObjectId,
        ref: 'OrderLine'
    }],
});

const Order = mongoose.model('Order', orderSchema);
export {Order}