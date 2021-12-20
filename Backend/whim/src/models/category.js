import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String,
    fatherCategory: {
        type: mongoose.ObjectId,
        ref: 'Category'
    }
});

const Category = mongoose.model('Category', categorySchema);
export { Category }