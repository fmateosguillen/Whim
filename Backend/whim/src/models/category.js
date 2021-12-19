import mongoose from 'mongoose';
const { Schema } = mongoose;

const categoryScheme = new Scheme({
    name: String,
    fatherCategory: {
        type: mongoose.ObjectId,
        ref: 'Category'
    }
});

const Category = mongoose.model('Category', categoryScheme);
export { Category }