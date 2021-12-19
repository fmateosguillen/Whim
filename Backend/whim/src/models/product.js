import { kStringMaxLength } from 'buffer';
import mongoose from 'mongoose';
import internal from 'stream';
import { serializeInteger } from 'whatwg-url';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    brand: String,
    countryOfOrigin: String,
    stock: Number,
    price: Number,
    category: {
        type: mongoose.ObjectId,
        ref: 'Category'
    },
    avaliable: Boolean
});

const Product = mongoose.model('Product', productSchema);
export {Product}