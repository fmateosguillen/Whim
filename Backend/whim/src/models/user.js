import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    city: String,
    role: { type: String, default: 'user'}
});

const User = mongoose.model('User', userSchema);
export { User }